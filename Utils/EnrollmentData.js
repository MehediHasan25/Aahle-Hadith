export const month = [
                { label: 'Jan', value: 'January' },
                { label: 'Feb', value: 'February' },
                { label: 'Mar', value: 'March' },
                { label: 'Apr', value: 'April' },
                { label: 'May', value: 'May' },
                { label: 'Jun', value: 'June' },
                { label: 'Jul', value: 'July' },
                { label: 'Aug', value: 'August' },
                { label: 'Sep', value: 'September' },
                { label: 'Oct', value: 'October' },
                { label: 'Nov', value: 'November' },
                { label: 'Dec', value: 'December' }
                ];


export const year =[ 
            {label:"2013" , value:"2013"},
            {label:"2014" , value:"2014"},
            {label:"2015" , value:"2015"},
            {label:"2016" , value:"2016"},
            {label:"2017" , value:"2017"},
            {label:"2018" , value:"2018"},
            {label:"2019" , value:"2019"},
            {label:"2020" , value:"2020"},
            {label:"2021" , value:"2021"},
            {label:"2022" , value:"2022"},
            {label:"2023" , value:"2023"},
            {label:"2024" , value:"2024"},
            {label:"2025" , value:"2025"},
            {label:"2026" , value:"2026"},
            {label:"2027" , value:"2027"},
            {label:"2028" , value:"2028"},
            {label:"2029" , value:"2029"},
            {label:"2030" , value:"2030"},
            {label:"2031" , value:"2031"},
            {label:"2032" , value:"2032"},
            {label:"2033" , value:"2033"},
            {label:"2034" , value:"2034"},
            {label:"2035" , value:"2035"},
            {label:"2036" , value:"2036"},
            {label:"2037" , value:"2037"},
            {label:"2038" , value:"2038"},
            {label:"2039" , value:"2039"},
            {label:"2040" , value:"2040"},
            {label:"2041" , value:"2041"},
            {label:"2042" , value:"2042"},
            {label:"2043" , value:"2043"},
            {label:"2044" , value:"2044"},
            {label:"2045" , value:"2045"},
            {label:"2046" , value:"2046"},
            {label:"2047" , value:"2047"},
            {label:"2048" , value:"2048"},
            {label:"2049" , value:"2049"},
            {label:"2050" , value:"2050"},
            {label:"2051" , value:"2051"},
            {label:"2052" , value:"2052"},
            {label:"2053" , value:"2053"},

                    ];


export const conversionDate = (d) =>{
let spData = d.split("");
let year = spData[6]+spData[7]+spData[8]+spData[9];
let day =spData[3]+ spData[4];
let month = spData[0]+ spData[1];

let fullConv = year+"-"+month+"-"+day;
return fullConv;
}