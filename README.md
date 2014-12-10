#Seminary-App

### This application is for Seminary teachers to take attendance quickly at the beginning of class.

#####Teachers will first pick the class they want to mark attendance for. Quickly navigate to other classes with the *class dropdown* at the top of the page.

Once in a class a teacher can navigate to days within that class and mark attendance for each individual student as well as changing all unmarked students to either present or absent (once all student have been marked the mark all feature wont change anything). Teachers can also toggle pictures on and off.

##Instructions for demo:

**1. grunt and bower required**

**2. navigate to Seminary-App**

        $ cd <Choose Location>

**3. Install Ionic and Cordova**

        $ npm install -g ionic
       
        $ npm install -g cordova

**3. clone this repository**

        $ cd <Choose Location>
        
        $ git clone https://github.com/deeger/Seminary-App.git

**4. after installation run App**

        Show in web browser
        $ ionic serve
        
        Run in Cordova emulator
        $ ionic platform add ios
        $ ionic build ios
        $ ionic run ios


The Command `ionic serve` will compile all sass and watch folders for changes.  All changes made in html, js, and sass should show in browser immediately.
