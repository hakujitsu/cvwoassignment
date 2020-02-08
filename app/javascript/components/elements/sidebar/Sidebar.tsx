import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ITag } from '../../redux/types'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import {
    Link
  } from "react-router-dom";

type Props = {   
    tags: ITag[],
}

class Sidebar extends React.Component<Props> {
    constructor(props:Props) {
        super(props);
        this.state = {
        };
      }

    render () {
        var tags = this.props.tags.map((tag) => {
            return(
                <div className = "sbtag" key={tag.id}>
                    <Link to={'/tag/' + `${tag.id}`}>
                        <div className ="circle" style={{backgroundColor: tag.color}} ></div>
                        {tag.name}
                    </Link>
                </div>
            )
        })

        return (
            <div className = "sidebar">
                <div className = "default_sidebar">
                    <div className = "default_options">
                        <Link to="/">
                        <FormatListBulletedIcon className = "icon" color="action"/>
                        <span className = "sb">All</span>
                        </Link>
                    </div>
                
                </div>

                <div className = "sidebar_tags">
                    <Link to="/tags">
                    <div className = "sb_tag_title">
                        <strong>Tags</strong>
                    </div>
                    </Link>
                    <hr/>

                    {tags}

                </div>
            </div>
        );
    }
}

export default Sidebar
