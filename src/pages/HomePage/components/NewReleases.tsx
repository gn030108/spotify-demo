import { Grid2, Typography } from "@mui/material";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid2 size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists.map((artist) => artist.name).join(", ")} //아티스트 여러명일 경우
              />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
