const getUniquePlacesInfo = (places, prices) => {
  let uniquePlacesInfo = [];
  places.forEach((place) => {
    let isAlreadyMarked = false;
    uniquePlacesInfo.forEach((element) => {
      if (element.placeType === place.placeType) isAlreadyMarked = true;
    });
    if (!isAlreadyMarked) {
      const amountOfIdenticalPlaces = getAmountOfIdenticalPlaces(
        place.placeType,
        places
      );
      let onePlacePrice = getPlacePrice(place, prices);
      let totalPrice = onePlacePrice * amountOfIdenticalPlaces;

      uniquePlacesInfo = [
        ...uniquePlacesInfo,
        {
          amount: amountOfIdenticalPlaces,
          placeType: place.placeType,
          totalPrice: totalPrice,
          onePlacePrice: onePlacePrice,
        },
      ];
    }
  });
  return uniquePlacesInfo;
};

const getPlacePrice = (place, prices) => {
  for (let i = 0; i < prices.length; i++) {
    if (prices[i].placeType === place.placeType) return prices[i].ticketPrice;
  }
};

const getAmountOfIdenticalPlaces = (placeType, places) => {
  const identicalPlaces = places.filter(
    (currentPlace) => currentPlace.placeType === placeType
  );
  return identicalPlaces.length;
};

export { getUniquePlacesInfo };
