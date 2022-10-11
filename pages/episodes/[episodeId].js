import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const Episode = ({ episodeList }) => {
  const router = useRouter();
  console.log(router);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div> 
      <h2>
        name:{episodeList.name} - date {episodeList.air_date}
      </h2>
    </div>
  );
};

export default Episode;

// this function create our page list => episodes/1, episodes/2

export async function getStaticPaths() {
  const { data } = await axios.get("https://rickandmortyapi.com/api/episode");
  const paths = data.results.map((episode) => {
    return {
      //params key is the obj and key of this obj shoulde comes from file name in bracket. => episodeId
      //value of the obj in params shoulde be string =>`${episode.id}`, "1" ,"2" , "sth" ,...
      params: { episodeId: `${episode.id}` },
    };
  });
  console.log(paths);
  return {
    // paths array with params key should be returned. key with "params" name is necessary
    //params key is the obj and key of this obj shoulde comes from file name in bracket. => episodeId
    //value of the obj in params shoulde be string => "1" ,"2" , "sth" ,...

    // paths:[
    //     {params:{episodeId:"1"}},
    //     {},
    //     {}
    // ]
    paths,
    fallback: true,
  };
}

// finally "getStaticPathes" return an array of params with name of "path"
// for every "episodeId" in "params" "getStaticProps" function will call

export async function getStaticProps(contex) {
  const { params } = contex;
  //"episodeId" comes from file name in bracket.
  const data = await axios.get(
    `https://rickandmortyapi.com/api/episode/${params.episodeId}`
  );

  return {
    props: {
      episodeList: data.data,
    },
  };
}
