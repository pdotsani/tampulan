interface Categories {
  href: string;
  id: string;
  icons: [{ height: number; url: string; width: number; }];
  name: string;
}

interface Playlists {
  message: string;
  playlists: [{
    href: string;
    items: any[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  }]
}

interface Tracks {
  href: string;
  items: any[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export {
  Categories,
  Playlists,
  Tracks
}
