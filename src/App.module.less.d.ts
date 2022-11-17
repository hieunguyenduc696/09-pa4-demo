declare namespace AppModuleLessNamespace {
  export interface IAppModuleLess {
    hello: string;
  }
}

declare const AppModuleLessModule: AppModuleLessNamespace.IAppModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppModuleLessNamespace.IAppModuleLess;
};

export = AppModuleLessModule;
