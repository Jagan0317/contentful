import { previewClient } from '@/lib/contentful'


export default async function handler(req, res) {
  const { id } = req.query; 

  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const client = previewClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    const entry = await environment.getEntry(id);

    if (!entry) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    if (entry.isPublished()) {
      await entry.unpublish();
    }
    await entry.delete()

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ message: 'Failed to delete recipe' });
  }
}
