import axios from 'axios';
import Link from 'next/link';
import React from 'react'


const EpisodeList = ({episodeList}) => {
  return (
    <div>
        <h1>Episode page</h1>
        {episodeList.results.map((episode)=>{
            return(
                <div key={episode.id}>
                    <Link href={`/episodes/${episode.id}`}>
                        <a>
                            <h2>
                                episode:{episode.episode}- name: {episode.name}
                            </h2>
                        </a>
                    </Link>
                </div>
            )
        })}
    </div>
  )
}

export default EpisodeList;

export async function getStaticProps() {
    const {data}= await axios.get("https://rickandmortyapi.com/api/episode")
    return{
        props:{
            episodeList: data
        }
    }
}
