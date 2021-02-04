import React from 'react';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            details: {}
        }
    }
    componentDidMount() {
        fetch(" https://localhost:44323/api/marketplace/Gettitledetail?titleid/"+this.props.titleId, {
            method: "GET",
            // if any headers added in future it will be used
            // "headers": {
            //   "x-rapidapi-host": "fairestdb.p.rapidapi.com",
            //   "x-rapidapi-key": "apikey"
            // }
          })
            .then((response) => response.json())
            .then((response) => {
              this.setState({
                details:response
              })
            })
            .catch((err) => {
              console.log(err);
            });
    }
    render() {
        return(
            <div className="details">
            <div>Title : {this.state.details.titleName}</div>
            <div>Role Type: {this.state.details.roleType},</div>
            <div>Name: {this.state.details.name},</div>
            <div>Participant Type: {this.state.details.participantType},</div>
            <div>type: {this.state.details.type},</div>
            <div>Description: {this.state.details.description} </div>
            <div>awardWon: {this.state.details.awardWon},</div>
            <div>awardCompany: {this.state.details.awardCompany},</div>
            <div>awardYear: {this.state.details.awardYear}</div>
          </div>
        )
    }
}

export default Detail;