export const AWS = ''

const initialInputs = {
    medicionEspesores:{
        dispositivo: '',
        cliente: '',
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
        resultado:'',
        scheme: {idEnvolvente:'', idCasquete:'', grid: [], gridData: {}},
        observaciones:'',
        firma:'',
        conclusion: '',
    },
    empty:{},
};

let envolventes = [
    { id: '1', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4, 5]], 
        ['Casquete', ['Derecho','Izquierdo']]
        ], source: require('../assets/scheme/envolventes/1.png') },
    { id: '2', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4, 5]], 
        ['Casquete', ['Derecho','Izquierdo']]
        ], source: require('../assets/scheme/envolventes/2.png') },
    { id: '3', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4]], 
        ['Casquete', ['Derecho','Izquierdo']]
        ], source: require('../assets/scheme/envolventes/3.png') },
    { id: '4', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4, 5, 6, 7]], 
        ['Casquete',['Derecho','Izquierdo']]
        ], source: require('../assets/scheme/envolventes/4.png') },
    { id: '5', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4, 5]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/5.png') },
    { id: '6', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4, 5]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/5.png') },
    { id: '7', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4, 5, 6, 7]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/7.png') },
    { id: '8', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/8.png') },
    { id: '9', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4, 5, 6]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/9.png') },
    { id: '10', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F'], [1, 2, 3, 4]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/10.png') },
    { id: '11', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4, 5, 6]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/11.png') },
    { id: '12', grid:[
        ['Envolvente', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], [1, 2, 3, 4]], 
        ['Casquete', ['Inferior','Superior']]
        ], source: require('../assets/scheme/envolventes/12.png') },  
];

let casquetes = [
    { id: '1', grid:[1, 2, 3, 4, 5], source: require('../assets/scheme/casquetes/1.png')},
    { id: '2', grid:[1, 2, 3, 4, 5, 6, 7, 8, 9], source: require('../assets/scheme/casquetes/2.png') },
    { id: '3', grid:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], source: require('../assets/scheme/casquetes/3.png') },
];

export { initialInputs, envolventes, casquetes }