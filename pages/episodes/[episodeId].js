import React from 'react'

const Episode = ({episode}) => {
  return (
    <div>
        <h2>
            name:{episode.name} - date {episode.air_date}
        </h2>
    </div>
  )
}

export default Episode

// this function create our page list => episodes/1, episodes/2

export async function getStaticPathes(){
    const {data}= await axios.get("https://rickandmortyapi.com/api/episode");
    const path= data.results.map(episode =>{
        return{
//params key is the obj and key of this obj shoulde comes from file name in bracket. => episodeId
//value of the obj in params shoulde be string =>`${episode.id}`, "1" ,"2" , "sth" ,...
params:{episodeId:`${episode.id}`}
        }
        
    })
    return{
// paths array with params key should be returned. key with "params" name is necessary
//params key is the obj and key of this obj shoulde comes from file name in bracket. => episodeId
//value of the obj in params shoulde be string => "1" ,"2" , "sth" ,...
        
// paths:[ 
//     {params:{episodeId:"1"}},
 //     {},
//     {}
// ]
            path,
            fallback:false,
                }
}


// finally "getStaticPathes" return an array of params with name of "path"
// for every "episodeId" in "params" "getStaticProps" function will call


export async function getStaticProps(contex) {
    const {params}=contex
    //"episodeId" comes from file name in bracket. 
    const {data}= await axios.get(`https://rickandmortyapi.com/api/episode/${params.episodeId}`)
    return{
        props:{
            episodeList: data
        }
    }
}