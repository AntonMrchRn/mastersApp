import { Material, Offer, Service } from '@/store/api/tasks/types';

export const getInitServices = (offer: Offer, services: Service[]) => {
  const initServices: Service[] = offer.services.map(serv => {
    const coordServices = services.find(ser => ser.name === serv.name);
    const initMaterials: Material[] =
      serv.materials?.map(mat => {
        const coordMaterial = coordServices?.materials?.find(
          m => m.name === mat.name,
        );
        return {
          ...mat,
          price: coordMaterial ? coordMaterial.price : mat.price,
          canDelete: !coordMaterial,
          localPrice: mat.price?.toString(),
          count: coordMaterial ? coordMaterial.count : mat.count,
          localCount: mat.count.toString(),
        };
      }) || [];
    return {
      ...serv,
      canDelete: !coordServices,
      price: coordServices ? coordServices.price : serv.price,
      count: coordServices ? coordServices.count : serv.count,
      localPrice: serv.price.toString(),
      localCount: serv.count?.toString() || '',
      materials: initMaterials,
    };
  });

  return initServices;
};
