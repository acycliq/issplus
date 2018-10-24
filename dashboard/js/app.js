

var cookie = sessionStorage['myvariable']

if (!cookie){ // if you dont have cookie, run the default selection
    console.log('No cookie, starting with default dataset')
    var configSettings = config().get('default')
}
else {
    console.log('Found cookie: ' + cookie)
    var configSettings = config().get(cookie)
}
run(configSettings)

function dispatcher(x){
    console.log('you clicked '+ x)

    //save a cookie
    sessionStorage['myvariable'] = x;

    //reload page
    location.reload(true);

}


function run(c){
    var cellJson = c.cellData;
    var geneJson = c.geneData;

    d3.queue()
        .defer(d3.json, cellJson)
        .defer(d3.csv, geneJson)
        .await(splitCharts(c))
}


function splitCharts(myParam) {
    return (err, ...args) => {

        var cellData = args[0];
        var geneData = args[1];

        for (i = 0; i < cellData.length; ++i) {
            cellData[i].Cell_Num = +cellData[i].Cell_Num
            cellData[i].x = +cellData[i].X
            cellData[i].y = +cellData[i].Y
        }

        //render now the charts
        var issData = sectionChart(cellData);
        dapiChart(issData, geneData, myParam)
        landingPoint()
    }
}

function landingPoint(){
    var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        offsetX: getPageXY('default').x,
        offsetY: getPageXY('default').y,
        /* whatever properties you want to give it */
    });
    document.getElementById('sectionOverlay').dispatchEvent(evt);
}

//create ramp
// $('#scatter-plot').offset().left
// 23:54:03.456 1119.40625
// 23:56:01.679 d3.event.pageX - $('#scatter-plot').offset().left
// 23:56:01.685 418.59375
// 23:56:37.307 d3.event.pageY - $('#scatter-plot').offset().top
// 23:56:37.313 79
// 23:57:59.061 418.59375 + $('#scatter-plot').offset().left
// 23:57:59.064 1538
// 23:58:32.862 79 + $('#scatter-plot').offset().top
// 23:58:32.866 177
function getPageXY(str) {
    return str === 'default' ? {x:1538, y:177} :
        str === '161220KI_3-1_left' ? '#407F59' :
            str === '161220KI_3-1_right' ? '#407F59' :
                str === '161220KI_3-2_left' ? '#407F59' :
                    str === '161220KI_3-2_right' ? '#407F59' :
                        str === '161220KI_3-3_left' ? '#407F59' :
                            str === '161220KI_3-3_right' ? '#407F59' :
                                str === '161220KI_3-4_left' ? '#407F59' :
                                    str === '161220KI_3-4_right' ? '#407F59' :
                                        str === '161220KI_4-1_left' ? '#407F59' :
                                            str === '161220KI_4-1_right' ? '#407F59' :
                                                str === '161220KI_4-3_left' ? '#407F59' :
                                                    str === '161220KI_4-3_right' ? '#407F59' :
                                                        str === '161220KI_5-1_left' ? '#407F59' :
                                                            str === '161220KI_5-1_right' ? '#407F59' :
                                                                str === '161220KI_5-2_left' ? '#407F59' :
                                                                    str === '161220KI_5-2_right' ? '#407F59' :
                                                                        str === '161220KI_5-3_left' ? '#407F59' :
                                                                            str === '161220KI_5-3_right' ? '#407F59' :
                                                                                str === '161220KI_5-4_left' ? '#407F59' :
                                                                                    str === '161220KI_5-4_right' ? '#407F59' :
                                                                                        str === '161220KI_7-1_left' ? '#407F59' :
                                                                                            str === '161220KI_7-1_right' ? '#407F59' :
                                                                                                str === '161220KI_7-2_left' ? '#407F59' :
                                                                                                    str === '161220KI_7-2_right' ? '#407F59' :
                                                                                                        str === '161220KI_7-3_left' ? '#407F59' :
                                                                                                            str === '161220KI_7-3_right' ? '#407F59' :
                                                                                                                str === '161220KI_7-4_left' ? '#407F59' :
                                                                                                                    str === '161220KI_7-4_right' ? '#407F59' :
                                                                                                                        '#D04030';
}


