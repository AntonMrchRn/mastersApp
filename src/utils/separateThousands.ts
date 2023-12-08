export const separateThousands = (num: number) =>
  num.toString().includes('.')
    ? num
        .toString()
        .split('.')?.[0]
        ?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
      ',' +
      num.toFixed(2).split('.')?.[1]
    : num
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .replace('.', ',');
