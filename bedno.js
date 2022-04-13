function getVal() {
    const val = document.querySelector('input').value;
    console.log(val);
    if (val==Cardio) {
       
      } else if (val== Neuro) {
          let count=0;
          document.write("<h1>bed no:</h1>")
          document.write(count);
       document.write("<h1>ward:A</h1>");
       count=count+1;
      } else if(val==Dental) {
        let count=0;
        document.write("<h1>bed no:</h1>")
        document.write(count);
     document.write("<h1>ward:B</h1>");
     count=count+1;

      } else if (val== Pedia) {
        let count=0;
          document.write("<h1>bed no:</h1>")
          document.write(count);
       document.write("<h1>ward:C</h1>");
       count=count+1;
    } else if (val== general) {
        let count=0;
          document.write("<h1>bed no:</h1>")
          document.write(count);
       document.write("<h1>ward:D</h1>");
       count=count+1;
    } else if (val== gastro) {
        let count=0;
          document.write("<h1>bed no:</h1>")
          document.write(count);
       document.write("<h1>ward:E</h1>");
       count=count+1;
    }

  }
