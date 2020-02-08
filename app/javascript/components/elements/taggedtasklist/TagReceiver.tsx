import * as React from 'react';
import * as PropTypes from 'prop-types'
import TaggedTasklistHeader from './TaggedTasklistHeader'
import { ITask, ITag } from '../../redux/types'
import { useParams } from "react-router-dom";

type Props = {
    tasks: ITask[]
    tags: ITag[]
};

export const TagReceiver: React.FC<Props> = props => {
    let { tagid } = useParams();  
    let tag = parseInt(tagid!, 10);

    let tagname = props.tags.find(indivtag => indivtag.id == tag)?.name;
    
    let taggedTasks: ITask[] = props.tasks.filter(
        task => task.tags.find(indivtag => indivtag.id == tag) != undefined   
    );

    return(
        <TaggedTasklistHeader tagname={tagname!} taggedTasks={taggedTasks}/>
    )
}

