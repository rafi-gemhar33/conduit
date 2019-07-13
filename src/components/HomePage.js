import React from "react";
import { ShowTags, Pagination } from "./ShowTags";
import { ShowArticles } from "./ShowArticles";
import { ShowTab } from "./ShowTab";

export const HomePage = () => {
  return (
    <>
      <section className="hero is-medium is-success is-bold">
        <div className="hero-body">
          <div className="container hero-container">
            <h1 className="title is-1"> conduit </h1>
            <h2 className="subtitle is-4"> A place to share your knowledge.</h2>
          </div>
        </div>
      </section>
      <div className="base column is-8 is-offset-2">
        <section className="main-container">
          <div className="column is-three-quarters">
            <ShowTab />
            <ShowArticles />
          </div>
          <div>
            <ShowTags />
          </div>
        </section>
        <footer className="column is-three-quarters">
          <Pagination />
        </footer>
      </div>
    </>
  );
};