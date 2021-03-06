angular.module('app').factory('breedService', ['parseClientService', '$q',
    function(parseClientService, $q) {

        var _breeds = [
            "airedale-terrier",
            "akita-americain",
            "akita-inu",
            "american-staffordshire-terrier",
            "ancien-chien-d-arret-danois",
            "anglo-francais-de-petite-venerie",
            "ariegeois",
            "azawakh",
            "barbet",
            "barbu-tcheque",
            "barzoi",
            "basenji",
            "basset-artesien-normand",
            "basset-de-westphalie",
            "basset-des-alpes",
            "basset-fauve-de-bretagne",
            "basset-hound",
            "beagle",
            "beagle",
            "bearded",
            "beauceron",
            "bedlington",
            "berger-allemand",
            "berger-australien",
            "berger-belge",
            "berger-blanc-suisse",
            "berger-catalan",
            "berger-d-anatolie",
            "berger-d-asie-centrale",
            "berger-d-islande",
            "berger-de-bergame",
            "berger-de-brie",
            "berger-de-l-atlas",
            "berger-de-maremme-et-des-abruzzes",
            "berger-de-picardie",
            "berger-de-russie",
            "berger-des-pyrenees",
            "berger-des-shetland",
            "berger-du-caucase",
            "berger-du-massif-du-karst",
            "berger-finnois-de-laponie",
            "berger-hollandais",
            "berger-polonais-de-plaine",
            "berger-polonais-de-podhale",
            "berger-portugais",
            "berger-yougoslave",
            "bichon-a-poil-frise",
            "bichon-bolonais",
            "bichon-havanais",
            "bichon-maltais",
            "billy",
            "black-and-tan-coonhound",
            "bleu-de-gascogne",
            "bobtail",
            "border-collie",
            "border-terrier",
            "bouledogue-francais",
            "bouvier-bernois",
            "bouvier-d-appenzell",
            "bouvier-d-australie",
            "bouvier-de-l-entlebuch",
            "bouvier-des-ardennes",
            "bouvier-des-flandres",
            "boxer",
            "brachet-allemand",
            "brachet-autrichien-noir-et-feu",
            "brachet-de-styrie-a-poil-dur",
            "brachet-polonais",
            "brachet-tyrolien",
            "braque-allemand-a-poil-court",
            "braque-allemand-a-poil-dur",
            "braque-allemand-a-poil-raide",
            "braque-d-auvergne",
            "braque-de-burgos",
            "braque-de-l-ariege",
            "braque-de-weimar",
            "braque-du-bourbonnais",
            "braque-francais",
            "braque-hongrois-a-poil-court",
            "braque-hongrois-a-poil-dur",
            "braque-italien",
            "braque-saint-germain",
            "braque-slovaque-a-poil-dur",
            "briquet-griffon-vendeen",
            "broholmer",
            "buhund-norvegien",
            "bull-terrier",
            "bulldog",
            "bullmastiff",
            "cairn-terrier",
            "cane-corso",
            "caniche",
            "cao-de-castro-laboreiro",
            "cao-fila-de-sao-miguel",
            "carlin",
            "cavalier-king-charles-spaniel",
            "chesapeake-bay-retriever",
            "chien-chinois-a-crete",
            "chien-courant-d-istrie-a-poil-dur",
            "chien-courant-d-istrie-a-poil-ras",
            "chien-courant-de-bosnie-a-poil-dur",
            "chien-courant-de-halden",
            "chien-courant-de-hygen",
            "chien-courant-de-posavatz",
            "chien-courant-de-transylvanie",
            "chien-courant-espagnol",
            "chien-courant-finnois",
            "chien-courant-hellenique",
            "chien-courant-italien",
            "chien-courant-serbe",
            "chien-courant-slovaque",
            "chien-courant-suisse",
            "chien-courant-yougoslave-de-montagne",
            "chien-courant-yougoslave-tricolore",
            "chien-d-arret-allemand-a-poil-long",
            "chien-d-arret-portugais",
            "chien-d-artois",
            "chien-d-eau-americain",
            "chien-d-eau-espagnol",
            "chien-d-eau-frison",
            "chien-d-eau-irlandais",
            "chien-d-eau-portugais",
            "chien-d-eau-romagnol",
            "chien-d-elan-norvegien",
            "chien-d-elan-suedois",
            "chien-d-ours-de-carelie",
            "chien-d-oysel",
            "chien-de-berger-de-croatie",
            "chien-de-berger-de-majorque",
            "chien-de-canaan",
            "chien-de-montagne-des-pyrenees",
            "chien-de-montagne-portugais",
            "chien-de-saint-hubert",
            "chien-de-taiwan",
            "chien-du-groenland",
            "chien-du-pharaon",
            "chien-finnois-de-laponie",
            "chien-norvegien-de-macareux",
            "chien-nu-du-perou",
            "chien-nu-mexicain",
            "chien-rouge-de-baviere",
            "chien-rouge-de-hanovre",
            "chien-suedois-de-laponie",
            "chien-thailandais",
            "chien-loup-de-saarloos",
            "chien-loup-tcheque",
            "chihuahua",
            "chow-chow",
            "cirneco-de-l-etna",
            "clumber-spaniel",
            "cocker-americain",
            "cocker-anglais",
            "colley-a-poil-court",
            "colley-a-poil-long",
            "coton-de-tulear",
            "curly-coated-retriever",
            "dalmatien",
            "dandie-dinmont-terrier",
            "dobermann",
            "dogo-canario",
            "dogue-allemand",
            "dogue-argentin",
            "dogue-de-bordeaux",
            "dogue-de-majorque",
            "dogue-du-tibet",
            "drever",
            "dunker",
            "epagneul-a-perdrix-de-drente",
            "epagneul-bleu-de-picardie",
            "epagneul-breton",
            "epagneul-de-pont-audemer",
            "epagneul-francais",
            "epagneul-japonais",
            "epagneul-nain-continental",
            "epagneul-picard",
            "epagneul-tibetain",
            "eurasier",
            "field-spaniel",
            "fila-brasileiro",
            "flat-coated-retriever",
            "fox-terrier",
            "foxhound-americain",
            "foxhound-anglais",
            "francais-blanc-et-noir",
            "francais-blanc-et-orange",
            "francais-tricolore",
            "golden-retriever",
            "grand-anglo-francais-blanc-et-noir",
            "grand-anglo-francais-blanc-et-orange",
            "grand-anglo-francais-tricolore",
            "grand-basset-griffon-vendeen",
            "grand-bouvier-suisse",
            "grand-gascon-saintongeois",
            "grand-griffon-vendeen",
            "grand-munsterlander",
            "greyhound",
            "griffon-a-poil-dur-korthals",
            "griffon-belge",
            "griffon-bruxellois",
            "griffon-fauve-de-bretagne",
            "griffon-nivernais",
            "hamilton-stovare",
            "harrier",
            "hokkaido",
            "hovawart",
            "husky-siberien",
            "irish-glen-of-imaal-terrier",
            "irish-terrier",
            "irish-terrier-a-poil-doux",
            "jack-russell-terrier",
            "jagdterrier",
            "kai",
            "kelpie",
            "kerry-blue-terrier",
            "king-charles-spaniel",
            "kishu",
            "komondor",
            "korea-jindo-dog",
            "kromfohrlander",
            "kuvasz",
            "labrador-retriever",
            "laika-de-siberie-occidentale",
            "laika-de-siberie-orientale",
            "laika-russe-europeen",
            "lakeland-terrier",
            "landseer",
            "leonberger",
            "levrier-afghan",
            "levrier-ecossais",
            "levrier-espagnol",
            "levrier-hongrois",
            "levrier-irlandais",
            "levrier-polonais",
            "lhassa-apso",
            "malamute-de-l-alaska",
            "manchester-terrier",
            "mastiff",
            "matin-des-pyrenees",
            "matin-espagnol",
            "matin-napolitain",
            "mudi",
            "norfolk-terrier-et-norwich-terrier",
            "otterhound",
            "parson-russell-terrier",
            "pekinois",
            "petit-basset-griffon-vendeen",
            "petit-brabancon",
            "petit-chien-courant-suisse",
            "petit-chien-hollandais-de-chasse-au-gibier-d-eau",
            "petit-chien-lion",
            "petit-gascon-saintongeois",
            "petit-levrier-italien",
            "petit-munsterlander",
            "pinscher",
            "pinscher-autrichien-a-poil-court",
            "podenco-canario",
            "podenco-ibicenco",
            "podenco-portugais",
            "pointer-anglais",
            "poitevin",
            "porcelaine",
            "pudelpointer",
            "puli",
            "pumi",
            "rafeiro-do -alentejo",
            "    retriever-de-la-nouvelle-ecosse",
            "rhodesian-ridgeback",
            "rottweiler",
            "saint-bernard",
            "saluki",
            "samoyede",
            "schapendoes-neerlandais",
            "schiller-stovare",
            "schipperke",
            "schnauzer",
            "scottish-terrier",
            "sealyham-terrier",
            "setter-anglais",
            "setter-gordon",
            "setter-irlandais",
            "setter-irlandais-rouge-et-blanc",
            "shar-pei",
            "shiba-inu",
            "shih-tzu",
            "shikoku",
            "silky-terrier",
            "skye-terrier",
            "sloughi",
            "slovensky-cuvac",
            "smaland-stovare",
            "smous-des-pays-bas",
            "spinone",
            "spitz-allemand",
            "spitz-de-norbotten",
            "spitz-des-wisigoths",
            "spitz-finlandais",
            "spitz-japonais",
            "springer-anglais",
            "stabyhoun",
            "staffordshire-bull-terrier",
            "sussex-spaniel",
            "teckel",
            "terre-neuve",
            "terrier-australien",
            "terrier-bresilien",
            "terrier-de-boston",
            "terrier-japonais",
            "terrier-noir-russe",
            "terrier-tcheque",
            "terrier-tibetain",
            "tosa",
            "toy-terrier-anglais-noir-et-feu",
            "volpino",
            "welsh-corgi",
            "welsh-springer-spaniel",
            "welsh-terrier",
            "west-highland-white-terrier",
            "whippet",
            "yorkshire-terrier",
            "autre"
        ];

        var _service = {};
        _service = {
            getBreeds: function() {
                return _breeds;
            }
        };
        return _service;
    }
]);
