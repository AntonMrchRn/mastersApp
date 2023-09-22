export const separateThousands = (num: number) =>
  num.toString().includes('.')
    ? num.toFixed(2)
    : num
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',');
