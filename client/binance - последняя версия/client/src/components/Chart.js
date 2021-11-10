import {connect} from 'react-redux'
import {} from "../redux/actions";
import { Line } from 'react-chartjs-2';


const Chart = (props) => {
  console.log('iter: ' + props.iter);
  console.log('datas: ' + props.datas);
    const data =(canvas)=> {
        const ctx = canvas.getContext("2d")
        const {width: graphWidth, height: graphHeight} = ctx.canvas;
        const gradient = ctx.createLinearGradient(0, 0, graphWidth * 2, 0);
        const gradient2 = ctx.createLinearGradient(0, 0, graphWidth * 2, 0);
        gradient.addColorStop(0, "#6248db");
        gradient.addColorStop(1, "#c94af2");
        gradient2.addColorStop(1, "rgba(255, 255, 255, 0.0)");
        gradient2.addColorStop(0, "rgba(55, 81, 255, 0.4)");
        return {
            labels: props.iter,
            datasets: [
                {
                    label: 'Profit',
                    data: props.datas,
                    fill: true,
                    backgroundColor: gradient2,
                    borderColor: "#3751FF",
                },
            ],
        }
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
            point:{
                radius: 5
            },
            line: {
                tension: 0.3
            }
        },
        scales: {
            y: {
                display: true,
                position: "right",
                title: {
                    display: false,
                    text: 'Value'
                },
                grid: {
                    drawBorder: false,
                    color: 'rgba(159,162,180, 0.56)',
                    //borderDash: [10, 10],
                    lineWidth: 1,
                },
                ticks: {
                    color:"#9FA2B4",
                    callback: function(label, index, labels) {
                        return label+'$';
                    }
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                    color: 'rgba(61,76,135, 0.6)',
                    lineWidth: 1,
                },
                ticks: {
                    color:"#9FA2B4",
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart'
            }
        }
    };
    return (
            <div className="chart-canvas">
                <Line data={data} options={options} />
            </div>
    );
}
const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //alert: state.app.alert
    iter: state.binanceApi.iter,
    datas: state.binanceApi.datas
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
