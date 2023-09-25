import React from "react";
import { useGetPostsQuery } from "../redux/api";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { data, isLoading, status, isError } = useGetPostsQuery();
  const [items, setItems] = React.useState([]);
  const isItemLoaded = (index) => !!items[index];
  const itemCount = items.length < 100000 ? items.length + 1 : 100000;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const loadNextPage = (stopIndex) => {
    if (stopIndex === items.length) {
      sleep(1000).then(() => setItems([...items, ...data]));
    }
  };

  React.useEffect(() => {
    if (status === "fulfilled") {
      setItems([...data]);
    }
  }, [data, status]);

  const Err = () => {
    return <div className="error">Ошибка получения данных</div>;
  };

  const Row = ({ index, style }) => {
    const post = items[index];
    return (
      <>
        <div className="row" style={style}>
          {isError ? (
            <Err />
          ) : (
            <>
              <div className="wrap_text">
                <span className="row_id">#{index + 1}</span>
                <span className="row_title">
                  {post?.title ? post?.title : "Loading..."}
                </span>
                <span className="row_body">{post?.body}</span>
              </div>
              <div className="wrap_button">
                <Link to={`/Picasso-test/posts/${post?.id}`} state={{ post }}>
                  просмотр
                </Link>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="App">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadNextPage}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={30}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default MainPage;
