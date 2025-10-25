import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { supabase } from '@/lib/supabaseClient'

// Create a lightweight Supabase baseQuery
const supabaseBaseQuery = async ({
  fn,
  args,
}) => {
  try {
    const { data, error } = await fn(...args)
    if (error) {
      return { error: { status: 500, data: error.message } }
    }
    return { data }
  } catch (error) {
    return { error: { status: 500, data: error.message } }
  }
}

export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: supabaseBaseQuery,
  tagTypes: ['Volunteers', 'Reports', 'Media'],
  endpoints: (builder) => ({
    // Volunteers
    getVolunteers: builder.query({
      query: (status = 'all') => {
        let query = supabase.from('volunteers').select('*').order('submitted_at', { ascending: false })
        if (status !== 'all') {
          query = query.eq('status', status)
        }
        return { fn: query.then.bind(query), args: [] }
      },
      providesTags: (result) => 
        result ? [
          ...result.map(({ id }) => ({ type: 'Volunteers', id })),
          { type: 'Volunteers', id: 'LIST' },
        ] : [{ type: 'Volunteers', id: 'LIST' }],
    }),
    approveVolunteer: builder.mutation({
      query: ({ id, status }) => ({
        fn: supabase.from('volunteers').update({ status }).eq('id', id).select().single,
        args: [],
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Volunteers', id }],
    }),

    // Reports
    getReports: builder.query({
      query: () => ({
        fn: supabase.from('reports').select('*').order('created_at', { ascending: false }).then.bind(supabase.from('reports').select('*')),
        args: [],
      }),
      providesTags: ['Reports'],
    }),
    deleteReport: builder.mutation({
      query: ({ reportId, fileUrl }) => {
        // This should be a transaction or handled in an Edge Function
        // For MVP, we do two separate calls.
        const deleteFile = supabase.storage.from('reports').remove([fileUrl.split('/').pop()])
        const deleteRecord = supabase.from('reports').delete().eq('id', reportId)
        return { fn: async () => {
          await deleteFile;
          return deleteRecord;
        }, args: [] }
      },
      invalidatesTags: ['Reports'],
    }),
    // Note: Upload (file + record) is handled in the component due to file handling

    // Media
    getMedia: builder.query({
      query: () => ({
        fn: supabase.from('media').select('*').order('created_at', { ascending: false }).then.bind(supabase.from('media').select('*')),
        args: [],
      }),
      providesTags: ['Media'],
    }),
    deleteMedia: builder.mutation({
      query: ({ mediaId, fileUrl }) => {
        const deleteFile = supabase.storage.from('media').remove([fileUrl.split('/').pop()])
        const deleteRecord = supabase.from('media').delete().eq('id', mediaId)
        return { fn: async () => {
          await deleteFile;
          return deleteRecord;
        }, args: [] }
      },
      invalidatesTags: ['Media'],
    }),
  }),
})

export const {
  useGetVolunteersQuery,
  useApproveVolunteerMutation,
  useGetReportsQuery,
  useDeleteReportMutation,
  useGetMediaQuery,
  useDeleteMediaMutation,
} = adminApiSlice