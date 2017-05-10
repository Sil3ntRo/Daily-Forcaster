$(document).ready(function()
{
        $("#submitForecast").click(function()
            {
                 return getforecast();
            });
    });


function getforecast(){
        var city = $("#searchCity").val();
        var days = $("#days").val();

        if(city != '' && days != ''){
                $.ajax({
                    url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=imperial" + "&cnt=" + days + "&APPID=dfc20fb3393b7759966b0b6c30c5264a",
                    type: "GET",
                    dataType: "jsonp",
                    success: function(data){
                            var table = '';
							var header = '<h2 style="font-weight:bold; font-size:30px;">Weather Forecast for ' +data.city.name+ ', ' +data.city.country+ '</h2>'
                            for(var i = 0; i < data.list.length; i++)
                                {
                                    table += "<tr>";
                                        
                                        table += "<td><img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                                        table += "<td>" + data.list[i].weather[0].main + "</td>";
                                        table += "<td>" + data.list[i].weather[0].description + "</td>";
                                        table += "<td>" + data.list[i].temp.morn + "&deg;F</td>";
                                        table += "<td>" + data.list[i].temp.night + "&deg;F</td>";
                                        table += "<td>" + data.list[i].temp.min + "&deg;F</td>";
                                        table += "<td>" + data.list[i].temp.max + "&deg;F</td>";
                                        table += "<td>" + data.list[i].pressure + "hpa</td>";
                                        table += "<td>" + data.list[i].humidity + "%</td>";
                                        table += "<td>" + data.list[i].speed + "mi/hr</td>";
										table += "<td>" + data.list[i].deg + "&deg</td>";

                                    table += "</tr>";
                                }
                                $("#forecastWeather").html(table);
                                $("#header").html(header);
                                $("#city").val('');
                                $("days").val('');
                        }
                });
            }
        else
            {
                $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Error! Please enter name of the city in the field</div>")
            }
    }