import React from 'react';

const tour = [{
  target: '.p6o-search-button',
  title: 'Deine Reise beginnt hier',
  content: 'Klicke auf das Lupen-Icon um eine Textsuche im Datensatz durchzuführen.',
  disableBeacon: true
}, {
  target: '.p6o-filters-button',
  content: 'Oder klicke den Filter-Button darunter, um die Filter-Palette zu öffnen.',
  disableBeacon: true
},{
  target: '.p6o-facets',
  title: 'Die Filter-Palette',
  content: 'Wenn die Filter-Palette offen ist, werden die Daten auf der Karte in verschiedenen Farben dargestellt, je nach gewählter Kategorie.',
  disableBeacon: true
},{
  target: '.p6o-facets-carousel',
  content: 'Mit den Pfeil-Icons kannst Du zwischen den verschiedenen Filterkategorien wechseln.',
  disableBeacon: true
},{
  target: '.p6o-facets ul',
  content: 'Klicke auf die Labels um einen Filter zu setzen, und andere Filterwerte auszublenden.',
  disableBeacon: true
},{
  target: 'body',
  placement: 'center',
  title: 'Viel Spass!',
  content: 
    <span>
      Danke dass Du Dir die Zeit genommen hast. Viel Spass beim Erkunden unseres Prototypen für das DOORS-Projekt "Digitale Wärme".
    </span>
}];

export default tour;