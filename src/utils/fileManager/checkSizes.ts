const MB = 1000000;
const imgTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const checkSizes = ({
  sizes,
  isDoc,
  isUserFile,
}: {
  sizes: { size: number; type: string }[];
  isDoc: boolean;
  isUserFile?: boolean;
}): boolean => {
  const allSizes = sizes.reduce<number>((acc, size) => acc + size.size, 0);
  if (allSizes >= MB * (isUserFile ? 50 : 250)) {
    return false;
  }

  if (!isDoc) {
    const maxSize = isUserFile ? 5 : 20;
    const moreThanMaxSize = sizes.filter(siz => siz.size >= maxSize * MB);
    if (moreThanMaxSize.length) {
      const moreThanMaxSizeImage = moreThanMaxSize.find(si =>
        imgTypes.includes(si.type)
      );
      if (moreThanMaxSizeImage) {
        return false;
      }

      const moreThan50MB = moreThanMaxSize.find(si => si.size >= 50 * MB);
      if (moreThan50MB) {
        return false;
      }
    }
  }

  if (isDoc && isUserFile) {
    const moreThanMaxSize = sizes.filter(siz => siz.size >= 5 * MB);

    const moreThanMaxSizeDoc = moreThanMaxSize.find(si =>
      imgTypes.includes(si.type)
    );

    if (moreThanMaxSizeDoc) {
      return false;
    }
  }

  return true;
};
