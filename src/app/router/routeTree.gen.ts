/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as PagesImport } from "./routes/pages";
import { Route as HandlesImport } from "./routes/handles";
import { Route as ExportImport } from "./routes/export";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const PagesRoute = PagesImport.update({
  id: "/pages",
  path: "/pages",
  getParentRoute: () => rootRoute,
} as any);

const HandlesRoute = HandlesImport.update({
  id: "/handles",
  path: "/handles",
  getParentRoute: () => rootRoute,
} as any);

const ExportRoute = ExportImport.update({
  id: "/export",
  path: "/export",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/export": {
      id: "/export";
      path: "/export";
      fullPath: "/export";
      preLoaderRoute: typeof ExportImport;
      parentRoute: typeof rootRoute;
    };
    "/handles": {
      id: "/handles";
      path: "/handles";
      fullPath: "/handles";
      preLoaderRoute: typeof HandlesImport;
      parentRoute: typeof rootRoute;
    };
    "/pages": {
      id: "/pages";
      path: "/pages";
      fullPath: "/pages";
      preLoaderRoute: typeof PagesImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/export": typeof ExportRoute;
  "/handles": typeof HandlesRoute;
  "/pages": typeof PagesRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/export": typeof ExportRoute;
  "/handles": typeof HandlesRoute;
  "/pages": typeof PagesRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/export": typeof ExportRoute;
  "/handles": typeof HandlesRoute;
  "/pages": typeof PagesRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/export" | "/handles" | "/pages";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/export" | "/handles" | "/pages";
  id: "__root__" | "/" | "/export" | "/handles" | "/pages";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  ExportRoute: typeof ExportRoute;
  HandlesRoute: typeof HandlesRoute;
  PagesRoute: typeof PagesRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ExportRoute: ExportRoute,
  HandlesRoute: HandlesRoute,
  PagesRoute: PagesRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/export",
        "/handles",
        "/pages"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/export": {
      "filePath": "export.tsx"
    },
    "/handles": {
      "filePath": "handles.tsx"
    },
    "/pages": {
      "filePath": "pages.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
