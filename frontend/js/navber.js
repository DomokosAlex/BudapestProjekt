const nav=document.getElementById("Nav");

nav.innerHTML=`
<nav class="navbar navbar-expand-sm" id="navbg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav w-100 d-flex justify-content-evenly mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#"><button
                                    class="btn btn-outline-primary btn-lg text-white">Dokumentáció</button></a></li>
                        <li class="nav-item"><a class="nav-link" href="#"><button
                                    class="btn btn-outline-primary btn-lg text-white">Ajánlás</button></a></li>
                        <li class="nav-item"><a class="nav-link" href="index.html"><button
                                    class="btn btn-outline-primary btn-lg text-white">Főoldal</button></a></li>
                        <li class="nav-item"><a class="nav-link" href="kerdoiv.html"><button
                                    class="btn btn-outline-primary btn-lg text-white">Kérdőív</button></a></li>
                        <li class="nav-item"><a class="nav-link" href="#"><button
                                    class="btn btn-outline-primary btn-lg text-white">Statisztika</button></a></li>

                    </ul>
                </div>
            </div>
        </nav>
`