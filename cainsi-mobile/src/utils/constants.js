export const AWS = ''

const initialInputs = {
    medicionEspesores:{
        dispositivo: 'Pulmón de aire vertical de grasería',
        cliente: 'Marfrig – Establecimientos Colonia',
        photoDivice: [] ,
        elaborado: 'Ing. Manuel Cavalleri',
        sitioInspeccion: 'Toda la superficie exterior del tanque.',
        resolucion: '0.01',
        minRange: '0.5',
        maxRange: '508',
        palpador:'5MHz',
        diametro: '6',
        norma: 'Norma: ASTM E-797\nMétodo: Medición de espesores por ultrasonido\nTécnica: Pulso - Eco',
        objeto: 'Todas las superficies accesibles y uniones soldadas del tanque.',
        propositoAlcance: 'Inspección de las superficies accesibles con la finalidad de descartar la existencia de deformaciones y severa corrosión localizada.',
        preparacion: 'Limpieza. Iluminación apropiada.',
        resultado:'Se observaron algunos desprendimientos del recubrimiento de pintura por acciones mecánicas exteriores (golpes y abrasiones)',
        scheme: {id:'', grid: [], gridData: {}},
        conclusion: 'No se detectaron zonas de bajo espesor, los valores medidos en una misma chapa no presentan severas diferencias entre sí.',
    },
    empty:{},
};

export { initialInputs }