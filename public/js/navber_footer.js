const nav = document.getElementById("Nav");

nav.innerHTML = `
   <nav class="navbar navbar-expand-lg navbar-dark" id="navbg">
    <div class="container-fluid">
        <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-label="Menü megnyitása">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100 d-flex justify-content-evenly">
                <li class="nav-item"><a class="nav-link" href="./dokumentacio.html"><span>Dokumentáció</span></a></li>
                <li class="nav-item"><a class="nav-link" href="./tarsak.html"><span>Társelemek</span></a></li>
                <li class="nav-item"><a class="nav-link" href="./index.html"><span>Főoldal</span></a></li>
                
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span>Tesztek</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="./kerdoiv.html">Kérdőív</a></li>
                        <li><a class="dropdown-item" href="./ajanlas.html">Glicin Teszt</a></li>
                    </ul>
                </li>

                <li class="nav-item"><a class="nav-link" href="./statisztikak.html"><span>Statisztika</span></a></li>
                <li class="nav-item"><a class="nav-link" href="./tudomanyhatter.html"><span>Források</span></a></li>
            </ul>
        </div>
    </div>
</nav>

`


const foot = document.getElementById("Footer");
foot.innerHTML = `<div class="row p-2 text-white">

            <div class="col-sm-12 col-md-4 ">
                <i>
                    <h3 class="my-3">Elérhetőségek:</h3>
                </i>
                <p><a href="https://github.com/DomokosAlex" target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i> Github (Domokos Alex)</a></p>
                <p><a href="https://github.com/KovacsMilan12454848" target="_blank" rel="noopener noreferrer"><i class="bi bi-github"></i> Github (Kovács Milán)</a></p>
            </div>

            <div class="col-sm-12 col-md-4">
                <i>
                    <h3 class="my-3">Készítette: </h3>
                </i>
                <p><i class="bi bi-code-slash"></i> Domokos Alex</p>
                <p><i class="bi bi-code-slash"></i> Kovács Milán</p>
            </div>

            <div class="col-sm-12 col-md-4">
                <i>
                    <h3 class="my-3">Fontosabb források:</h3>
                </i>
                <p><a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener noreferrer"><i class="bi bi-book"></i> pubmed</a></p>
                <p><a href="https://www.code4you.hu/wp-login.php?redirect_to=%2F" target="_blank" rel="noopener noreferrer"><i class="bi bi-journal-code"></i></i>
                        Code4You</a></p>
            </div>

        </div>`