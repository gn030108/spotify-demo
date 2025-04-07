import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "./../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Box,
  Grid2,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DefaultImage from "../../common/components/DefaultImage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";

const PlaylistHeader = styled(Grid2)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid2)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const PlaylistDetailPage = () => {
  //무한스크롤
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  //플레이리스트 데이터
  const { data: playlist, isLoading: isPlaylistLoading, error: playlistError } = useGetPlaylist({ playlist_id: id });
  //플레이리스트 아이템 데이터
  const {
    data: playlistItems,
    isLoading: isPlaylistITemsLoading,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });
  console.log("ddd", playlistItems);

  if (isPlaylistLoading) return <LoadingSpinner />;
  if (playlistError) {
    return <ErrorMessage errorMessage={playlistError.message} />;
  }

  return (
    <StyledTableContainer>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playlist?.images ? (
            <AlbumImage src={playlist?.images[0].url} alt="playlist_cover.jpg" />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid2 size={{ sm: 12, md: 10 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" width="20px" />
              <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
                {playlist?.owner?.display_name ? playlist?.owner.display_name : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </PlaylistHeader>
      {playlist?.tracks.total === 0 ? (
        <Typography>Let's find something for your playlist</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Duration</TableCell>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => {
                return (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                );
              })
            )}
            <TableRow sx={{ height: "5px" }} ref={ref} />
            {isFetchingNextPage && <LoadingSpinner />}
          </TableBody>
        </Table>
      )}
    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
