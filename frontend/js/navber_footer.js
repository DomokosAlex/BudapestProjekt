const nav=document.getElementById("Nav");

nav.innerHTML=`
<nav class="navbar navbar-expand-lg " id="navbg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav w-100 d-flex justify-content-evenly mb-2 mb-lg-0">
                        
                        <li class="nav-item "><a class="nav-link" href="#"><button
                                    class="border-bottom btn btn-lg text-white meret">Dokumentáció</button></a></li>

                        <li class="nav-item"><a class="nav-link" href="/html/ajanlas.html"><button
                                    class="border-bottom btn btn-lg text-white meret">Glicin Teszt</button></a></li>

                        <li class="nav-item"><a class="nav-link" href="/html/index.html"><button
                                    class="border-bottom btn btn-lg text-white meret">Főoldal</button></a></li>

                        <li class="nav-item"><a class="nav-link" href="/html/kerdoiv.html"><button
                                    class="border-bottom btn btn-lg text-white meret">Kérdőív</button></a></li>

                        <li class="nav-item"><a class="nav-link" href="/html/statisztikak.html"><button
                                    class="border-bottom btn btn-lg text-white meret">Statisztika</button></a></li>

                                    
                        <li class="nav-item"><a class="nav-link" href="/html/tudomanyhatter.html"><button
                                    class="border-bottom btn btn-lg text-white meret">Források</button></a></li>

                    </ul>
                </div>
            </div>
        </nav>
`


const foot = document.getElementById("Footer");
foot.innerHTML=`<div class="row p-2 text-white">

            <div class="col-sm-12 col-md-4 ">
                <i>
                    <h3 class="my-3">Elérhetőségek:</h3>
                </i>
                <p><a href="https://github.com/DomokosAlex"><i class="bi bi-github"></i> Github (Domokos Alex)</a></p>
                <p><a href="https://github.com/KovacsMilan12454848"><i class="bi bi-github"></i> Github (Kovács Milán)</a></p>
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
                <p><a href="https://pubmed.ncbi.nlm.nih.gov/"><i class="bi bi-book"></i> pubmed</a></p>
                <p><a href="https://www.code4you.hu/wp-login.php?redirect_to=%2F"><i class="bi bi-journal-code"></i></i>
                        Code4You</a></p>
            </div>

        </div>`