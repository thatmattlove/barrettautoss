import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

const getPhoto = async id => {
  const photo = await client.getAsset(id);
  const { title, file } = photo.fields;
  const { updatedAt } = photo.sys;
  const { url, details, fileName } = file;
  return {
    title,
    url: `https:${url}`,
    fileSize: details.size,
    width: details.image.width,
    height: details.image.height,
    updatedAt,
    fileName,
  };
};

const getPhotos = async photoRefs => {
  const photos = [];
  for (let p of photoRefs) {
    const photo = await getPhoto(p.sys.id);
    photos.push(photo);
  }
  return photos;
};

const parseCar = async ({ fields }) => {
  const { owner, vin, notes, photos: photoRefs } = fields;
  const photos = await getPhotos(photoRefs);
  return {
    owner,
    vin,
    notes,
    photos,
  };
};

export const getAllVins = async () => {
  const entries = await client.getEntries({ content_type: 'car', select: 'fields.vin' });
  const vins = entries.items.map(i => i.fields.vin);
  return vins;
};

export const getCar = async vin => {
  const vins = await getAllVins();
  if (!vins.includes(vin)) {
    return false;
  }
  const entries = await client.getEntries({ content_type: 'car', 'fields.vin[in]': vin });
  const car = await parseCar(entries.items[0]);
  return car;
};
