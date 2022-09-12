
//import { searchArtMuseum } from '../utils/apiRoutes';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import {SAVE_HARVARD_IMG} from '../utils/mutations';
import env from "react-dotenv";

//import { Link } from 'react-router-dom';

const HarvardArt = () => {
    const [saveHarvardImg, {error}] = useMutation(SAVE_HARVARD_IMG);

    //create state for holding return google api data
    const [ loading, setLoading] = useState(true);
    const [ items, setItems] = useState([]);

    //retrieves the api url and stores the json data into setItems.
    useEffect( async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HARVARD_KEY}`);
    
            if(!response){
                throw new Error('Something is wrong');
            }
            const data = await response.json();
            console.log(data);

            const artData = data.records.map((record) => ({
                creditline: record.creditline,
                imageUrl: record.primaryimageurl,
                culture: record.culture,
                medium: record.medium,
                title: record.title,
            }));

            setItems(artData);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    },[])

    //if user wants to save the image to their inspirational board
    const handleSaveImg = async (creditline, imageUrl, culture, medium, title) => {

        //get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }

        console.log(creditline, imageUrl, culture, medium, title);

        try {
            await saveHarvardImg({
                variables: {creditline, imageUrl, culture, medium, title}
            });
        } catch (err){
            console.error(err);
        }
    };

    return (
        <div className=''>
            {!loading && 
            items.map(record => (
                <div>
                    {record.imageUrl ? (
                        <div>
                            <h3 className='create-harvard-header'>{record.title}</h3>
                            <img className=" create-harvard-content" alt='Image' src={record.imageUrl} width={250} height={250}></img>
                            <p className='text-style'>Medium: {record.medium}</p>
                            <p className='text-style'>Culture: {record.culture}</p>
                            <p className='text-style'>Credit: {record.creditline}</p>
                            <div align="center ">
                            <button align="center" className="harvard-btn " onClick={ () => handleSaveImg(record.creditline, record.imageUrl, record.culture, record.medium, record.title)}> Save Image </button>
                            </div>
                        </div>
                            
                    ) : null}
                </div>
            ))}
             <h1 align="center"> <a href="https://arts.harvard.edu/"> Harvard Homepage</a> </h1>
        </div>
    );
};

export default HarvardArt;