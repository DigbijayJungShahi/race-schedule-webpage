function getRaceSchedule() {
    const year = document.getElementById('year').value;
  
    fetch(`https://ergast.com/api/f1/${year}/results.json`)
      .then(response => response.json())
      .then(data => {
        displaySchedule(data);
    })
      .catch(error => {
        console.error('Error fetching race schedule:', error);
        const raceSchedule = document.getElementById('raceSchedule');
        raceSchedule.innerHTML = '<p>Error fetching race schedule. Please try again later.</p>';
      });
  }

  function displaySchedule(data){
    const raceSchedule = document.getElementById('raceSchedule');

    const series = data.MRData.series;
    const season = data.MRData.RaceTable.season;
    const totalResults = data.MRData.total;

    const races = data.MRData.RaceTable.Races;

    const table = document.createElement('table');
    const tableHeader = table.createTHead();
    const row = tableHeader.insertRow();
    const headers = ['Season', 'Round', 'Race Name', 'Date', 'Time', 'Country', 'URL'];

    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      row.appendChild(th);
    });

    races.forEach(race => {
      const newRow = table.insertRow();
      newRow.insertCell().textContent = season;
      newRow.insertCell().textContent = race.round;
      newRow.insertCell().textContent = race.raceName;
      newRow.insertCell().textContent = race.date;
      newRow.insertCell().textContent = race.time || '-';
      newRow.insertCell().textContent = race.Circuit.Location.country;
      newRow.insertCell().innerHTML = `<a href="${race.url}" target="_blank">Link</a>`;
    });

    raceSchedule.appendChild(table);

    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Series:</strong> ${series}<br>
                        <strong>Season:</strong> ${season}<br>
                        <strong>Total number of results returned:</strong> ${races.length}`;
    raceSchedule.appendChild(summary);
  }
  
  