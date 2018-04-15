const translations = {
  // the `locale` parameter is mandatory, it enables react-translate to use
  // the right rules for singular and plural
  locale: 'es-ES',
  HomePage: {
    random_number_title: 'Generar números aleatorios',
    random_letter_title: 'Generar letras aleatorias',
  },
  NumberDraw: {
    random_number_default_title: 'Generar números aleatorios',
    random_number_description: 'Genera números aleatorios al azar',
    generate_numbers: 'Generar números',
    publish_draw: 'Generar resultados ahora',
    schedule_draw: 'Programar la tirada',
  },
  NumberDrawForm: {
    from: 'Desde',
    to: 'Hasta',
    number_of_results: 'Número de resultados',
    allow_repeated: 'Permitir números repetidos',
  },
  PublicNumberDrawDetails: {
    setup_description:
      '{{numberOfResults}} numbers will be selected randomly between {{from}} and {{to}} both included.',
    repeated_results_allowed: 'Numbers can be repeated in the results.',
    repeated_results_not_allowed: 'Numbers can not be repeated in the results.',
  },
  PublicDetails: {
    title_label: 'Título',
    title_placeholder: 'Sorteo de Navidad',
    description_label: 'Descripción',
    description_placeholder: 'Descripción del sorteo, bases del concurso, etc.',
  },
  MakeDrawPublicButton: {
    make_public: 'Haz esta tirada publica',
  },
  PublishDrawOptions: {
    when_show_winners: 'Cuándo quieres mostrar los resultados?',
    show_now: 'Mostrar ahora',
    choose_date: 'Elegir la fecha',
  },
  Letter: {
    random_letter_default_title: 'Generar letras aleatorias',
    number_of_letters: 'Número de letras',
    generate_letters: 'Generar letras',
  },
  RaffleDrawForm: {
    title: 'Título del sorteo',
    description: 'Descripcion',
    participants: 'Participantes',
    number_of_winners: 'Número de ganadores',
  },
  RaffleDraw: {
    // random_number_default_title: 'Generar números aleatorios',
    // random_number_description: 'Genera números aleatorios al azar',
    // generate_numbers: 'Generar números',
    publish_draw: 'Publicar sorteo',
    schedule_draw: 'Programar la tirada',
  },
  PublishedRaffle: {
    winners: 'Ganadores',
  },
  TranslationsSwitch: {
    change_language: 'Cambiar idioma',
  },
};

// Number: {
//   from: 'Desde',
//   KEY_WITH_PARAMS: 'Hello {{name}}',
//   KEY_WITH_PLURAL: [
//     'You have {{n}} message',
//     'You have {{n}} messages',
//   ],
// },

export default translations;
