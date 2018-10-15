import { action, autorun, computed, extendObservable } from "mobx";

class Store {
  constructor() {
    this.reset();
  }

  @action reset() {
    extendObservable(this, {
      assets: [],
      entries: [],
      loading: true,
      portfolioItems: []
    });
  }

  isLoading() {
    return this.loading;
  }

  retrieveAssets() {
    return this.entries;
  }

  retrieveEntries() {
    return this.entries;
  }

  retrievePortfolioItems() {
    return this.portfolioItems;
  }

  @computed get portfolioList() {
    return this.portfolioItems
      .map((item) => {
        const { fields, sys } = item;
        const { featuredMedia, title } = fields;
        const { id } = sys;
        const featuredAsset = this.assets.find((asset) => asset.sys.id === featuredMedia.sys.id);
        const assetUrl = featuredAsset.fields.file.url;

        return {
          assetUrl,
          id,
          title
        }
      });
  }
}

let store = new Store();
export default store;

autorun(() => {
  // Uncomment below this to see how autorun in action: https://mobx.js.org/refguide/autorun.html
  const { value } = store;
  console.log(value);
});
