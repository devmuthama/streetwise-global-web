import { useGetMediaQuery } from '@/features/admin/adminApiSlice';
import { Card } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Helmet } from 'react-helmet-async';

export function MediaPage() {
  const { data: media, error, isLoading } = useGetMediaQuery();

  return (
    <>
      <Helmet>
        <title>Media | StreetWise Global Network</title>
        <meta name="description" content="View photos and videos from our events and programs." />
      </Helmet>
      <div className="container py-16">
        <h1 className="text-4xl font-bold text-center">Media Gallery</h1>
        <p className="mt-4 max-w-2xl mx-auto text-center text-lg text-muted-foreground">
          See our mission in action.
        </p>

        <div className="mt-12">
          {isLoading && (
            <div className="flex justify-center"><Spinner size="lg" /></div>
          )}
          {error && (
            <p className="text-center text-destructive">Failed to load media.</p>
          )}
          {media && media.length === 0 && (
            <p className="text-center text-muted-foreground">No media items have been uploaded yet.</p>
          )}
          {media && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {media.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <img src={item.media_url} alt={item.title || 'StreetWise Event'} className="h-64 w-full object-cover" />
                  {item.title && (
                    <div className="p-4">
                      <p className="text-muted-foreground">{item.title}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}