import UserCarouselData from "../hooks/UserDataCarousel";
import MainCarousel from "../layouts/common/Carousel";
import GridItem from "../layouts/common/GridItems";
import EmptyState from "../layouts/utilities/EmptyState";
import ErrorMessage from "../layouts/utilities/Error";
import IsLoading from "../layouts/utilities/Loading";

export default function HomeComponent() {
  const { data, loading, error, refetch } = UserCarouselData();

  if (loading) {
    return (
      <section className="bg-gray-100 w-full max-w-[90rem] mx-auto">
        <header className="mt-20">
          <IsLoading message="Loading carousel..." height="400px" />
        </header>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 w-full max-w-[90rem] mx-auto">
        <header className="mt-20">
          <ErrorMessage
            title="Failed to load carousel"
            message={error}
            height="400px"
            onRetry={refetch}
          />
        </header>
      </section>
    );
  }

  if (!data || data.length === 0) {
    return (
      <section className="bg-gray-100 w-full max-w-[90rem] mx-auto">
        <header className="mt-20">
          <EmptyState
            title="No carousel items"
            message="There are no items to display at the moment."
            height="400px"
          />
        </header>
      </section>
    );
  }
  return (
    <>
      <section className="w-full h-full max-w-[90rem] mx-auto">
        <MainCarousel data={data} />
        <GridItem />
      </section>
    </>
  );
}
