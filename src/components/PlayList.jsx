import React, {useState, useEffect} from 'react';
import SimpleTable from './simpletable/SimpleTable';
import {getTextForm} from '../functions';

const PlayList = ({title, data, playerActive}) => {

    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        setIsCollapsed(playerActive);
    }, [playerActive]);

    const details = data.map((item, ind) => (ind + 1) + '. ' + item['title']);

    return (
        <>
            <h3 className='h3-responsive mb-3'>{title} ({data.length} {getTextForm(data.length, ['трек', 'трека', 'треков'])})</h3>
            {isCollapsed ?
                <button className='btn btn-sm btn-mdb-color' title='развернуть список'
                        onClick={() => setIsCollapsed(!isCollapsed)}>{title} ({data.length} треков) - развернуть
                    список</button>
                :
                <SimpleTable details={details}/>
            }
        </>
    );
};

export default PlayList;