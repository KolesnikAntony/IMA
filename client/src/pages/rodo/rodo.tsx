import React from "react";
import './rodo.scss';

const Rodo = () => {
    return <section className="rodo">
        <div className="container">
            <h2 className="rodo__title">RODO</h2>
           <h3 className="rodo__subtitle">
               Klauzula informacyjna RODO w zakresie przetwarzania danych osobowych
           </h3>
            <ol className="rodo__list">
                <li className="rodo__item">Administratorem danych osobowych jest Ilona Cuch, NIP:506-008-67-46, Gęsia Wólka 52, mail: ima.professionalzone@gmail.com, tel: <a
                    href="tel:+48792424240">+48 79 24 24 240</a></li>
                <li className="rodo__item">
                    Administrator wyznaczył inspektora ochrony danych osobowych. Dane kontaktowe inspektora: <br/> mail: <a
                    href="mailto:ima.professionalzone@gmail.com">ima.professionalzone@gmail.com</a>, <br/> tel: <a href="tel:+48792424240"> +48 79 24 24 240</a>
                </li>
                <li className="rodo__item"> Przekazane dane osobowe przetwarzane będą w celu realizacji usług, obsługi zgłoszeń i udzielania odpowiedzi na zgłoszenia;</li>
                <li className="rodo__item">Kategorie danych osobowych obejmują m.in. imię i nazwisko, numer telefonu, adres e-mail, adres, dane dedykowane do procesu/usługi/projektu;</li>
                <li className="rodo__item">Pani / Pana dane osobowe mogą być przekazywane podmiotom przetwarzającym dane osobowe na zlecenie administratora: dostawcy usług IT, firma kurierska, PayU.</li>
                <li className="rodo__item">Państwa dane osobowe będą przechowywane przez okres istnienia prawnie uzasadnionego interesu administratora, chyba że Pani / Pan wyrazi sprzeciw wobec przetwarzania danych;</li>
                <li className="rodo__item">Państwa dane nie będą przekazywane do państwa trzeciego ani organizacji międzynarodowej</li>
                <li className="rodo__item">Posiadają Państwo prawo dostępu do treści swoich danych oraz prawo ich sprostowania, usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem;</li>
                <li className="rodo__item"> Mają Państwo prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych, którym jest Prezes Urzędu Ochrony Danych Osobowych, gdy uznają Państwo, iż przetwarzanie Państwa danych osobowych narusza przepisy ustawy z dnia 10 maja 2018 r. o ochronie danych osobowych (tekst jednolity Dz. U. z 2018 r., poz. 1000) lub przepisy Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) z dnia 27 kwietnia 2016 r. (Dz.Urz.UE.L Nr 119, str. 1);</li>
                <li className="rodo__item">Dane udostępnione przez Panią/Pana  będą podlegały zautomatyzowanemu podejmowaniu decyzji oraz profilowaniu;</li>
                <li className="rodo__item">Podanie przez Państwa danych osobowych jest dobrowolne;</li>
            </ol>
        </div>
    </section>
};

export default Rodo;