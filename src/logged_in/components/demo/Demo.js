import React, { PureComponent } from "react";
import { withStyles, Grid, Container, GridList, Button, GridListTile } from "@material-ui/core";
import demodata from './screen_offer';

const styles = {
  input: { padding: "0px 9px" },
  outlinedInput: {
    width: 90,
    height: 40,
    pointerEvents: "none !important"
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    justifyContent: 'space-around'
  },
  costinfo: {
    display: "flex", 
    paddingTop: 30
  },
  buy: {
    paddingRight: 20
  },
  timeout: {
    height: 35, 
    background: 'yellow', 
    paddingTop: 10, 
    paddingLeft: 10
  },
  payout: {
    height: 35, 
    background: 'yellow', 
    paddingTop: 10, 
    paddingLeft: 10, 
    marginTop: 10
  },
  databody: {
    width: "40% !important",
    margin: "10px 20px !important",
    padding: "10px !important",
    border: "solid",
    height: "auto !important",
  }
};

class Demo extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {  
        demodata: demodata.offers,
        timeOut: [],
        totalCost: 0,
        originTime: []
    };
}
componentWillUnmount() {
  this._isMounted = false;
}
componentDidMount() {
  const { selectDemo } = this.props;
  selectDemo();
  this.setTimeout();
}
  
setTimeout = () =>{
  this._isMounted = true;
    let demodataArray = this.state.demodata;
    let timeOut = [];
    demodataArray.map((data, index) => {
      timeOut.push(data.offer.time);
      return data;
    })
    if(this._isMounted){
      this.setState({timeOut: timeOut, originTime: timeOut})
    }
    let time_count = [];
    setInterval(() => {
      timeOut = this.state.timeOut;
      timeOut.map((time, index) => {
        if(time!==0){
          time--;
        }else{
          // time=0;
        }
        time_count.push(time)
        return time;
      })
      timeOut = time_count;
      time_count = [];
      if(this._isMounted){
        this.setState({timeOut: timeOut})
      }
  }, 1000);
}

reSetTime = (id) => {
  let originTime = this.state.originTime;
  let demodata = this.state.demodata
  let timeOut = this.state.timeOut;
  let resetTime = [];
  let offerCost = '';
  let totalCost = this.state.totalCost;
  timeOut.map((time, index)=>{
    if(index===id){
      resetTime.push(originTime[id]);
    }else{
      resetTime.push(time);
    }
    return time;
  })
  demodata.map((data, index) => {
    if(index===id){
      offerCost = data.offer.cost;
    }
    return data;
  })
  totalCost += parseFloat(offerCost);
  this.setState({timeOut: resetTime, totalCost: totalCost})
  this.props.selectOffer(totalCost);
}

render() {
    const { classes } = this.props;
    return (
      <Container className={classes.wrapper}>
        <GridList style={{width: "100%", padding: 10}} cols={2}>
        {this.state.demodata.map((data, index) => (
            <GridListTile  className={classes.databody} key={index}>
                <div>
                    <span>Keywords: </span>
                    {
                        data.offer.keywords.map((keyword, index) => (
                            <span key={index}>{index===0 ? '' : ','} {keyword}</span>
                        ))
                    }
                </div>
                <div>Sectors: {data.offer.sector}</div>
                <div>
                    <span>Countries: </span>
                    {
                        data.offer.countries.map((country, index) => (
                            <span key={index}>{index===0 ? '' : ','} {country}</span>
                        ))
                    }
                </div>
                <div className={classes.costinfo}>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" onClick={()=>this.reSetTime(index)}>
                            <span className={classes.buy}>BUY</span><span>${data.offer.cost}</span>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.timeout}><span style={{marginTop: 15}}>Timeout: {this.state.timeOut[index]}</span></div>
                        <div className={classes.payout}><span>Max Payout: {data.offer.payout}</span></div>
                    </Grid>
                </div>
            </GridListTile>
        ))}
      </GridList>
    </Container>
    );
  }
}

Demo.propTypes = {
  // classes: PropTypes.object.isRequired,
  // transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // selectSubscription: PropTypes.func.isRequired
};

export default withStyles(styles)(Demo);