import supabase from './supabase';

export type Event = {
  id: string;
  video_url: string;
  license_plate_image_url: string | null;
  event_type: string;
  status: string | null;
};

const getProgress = async () => {
  const { count: total } = await supabase
    .from('events')
    .select('id', { count: 'exact', head: true });

  const { count: reviewed } = await supabase
    .from('events')
    .select('id', { count: 'exact', head: true })
    .not('status', 'is', null);

  return { reviewed: reviewed || 0, total: total || 0 };
};

const getNextVideo = async (): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .is('status', null)
    .limit(1);

  if (error) {
    console.error('Error fetching video:', error);
    return null;
  }

  return data?.[0] || null;
};

const markVideo = async (
  id: string,
  status: 'accepted' | 'rejected',
  reason?: string[]
) => {
  const response = await supabase
    .from('events')
    .update({
      status,
      ...(status === 'rejected' ? { rejection_reason: reason } : {}),
    })
    .eq('id', id)
    .select();

  console.log(response);

  if (response.error) {
    console.error('Error updating video:', response.error);
    throw response.error;
  }
};

export { getProgress, getNextVideo, markVideo };
