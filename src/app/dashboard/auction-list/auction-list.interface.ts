export interface IAuctionList {
    title: string;
    auctions: any[];  // Replace 'any' with the actual type of your auction items
    scrollLeft: () => void;
    scrollRight: () => void;
  }
