import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylistObject extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  track: ApiResponse<PlaylistTrack>;
  followers: Followers;
}

export interface PlaylistTrack {
  added_at?: string;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local: boolean;
  track?: Track | Episode;
}

export interface Track {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: { id: string; name: string; images: { url: string }[] };
  duration_ms: number;
  preview_url: string | null;
  type: "track";
}

export interface Episode {
  id: string;
  name: string;
  show: { id: string; name: string };
  duration_ms: number;
  audio_preview_url: string | null;
  type: "episode";
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}
