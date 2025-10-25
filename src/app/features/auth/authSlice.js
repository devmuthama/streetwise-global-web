import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabaseClient'

const initialState = {
  user: null,
  session: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

// Thunk to check for an existing user session
export const checkUserSession = createAsyncThunk(
  'auth/checkUserSession',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      if (!data.session) return { user: null, session: null }

      // Session exists, now get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', data.session.user.id)
        .single()

      if (profileError) throw profileError

      const user = {
        ...data.session.user,
        ...profile,
      }
      return { user, session: data.session }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk for Google Sign-In
export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin/dashboard',
        },
      })
      if (error) throw error
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk for Email/Password Sign-In
export const signInWithEmail = createAsyncThunk(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', data.user.id)
        .single()
      
      if (profileError) throw profileError

      const user = { ...data.user, ...profile }
      return { user, session: data.session }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk for Sign-Out
export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action) => {
      state.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Check User Session
      .addCase(checkUserSession.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.session = action.payload.session
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Sign In (Email)
      .addCase(signInWithEmail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.session = action.payload.session
        state.error = null
      })
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null
        state.session = null
        state.status = 'idle'
      })
  },
})

export const { setAuthStatus } = authSlice.actions

export default authSlice.reducer