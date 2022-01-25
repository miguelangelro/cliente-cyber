import { Producto } from './producto.model';
 import * as rsa from 'my-rsa'
 import * as bcu from 'bigint-crypto-utils'
 let d = 4167558298112539507737616412326910745041966499146259527027886364972652792063080813125619422045868731337812791882308864277212273176078221417946997337051731896166013102247098010793728801934839591968522905061013564793595214463541409580699070830183830643568578863297588644895342285205579531446839753871840896521771538085650637101007639549876978031825638558814621946525792120833882334793135437657892739024392461947448129571762571130174415470594475428148239167468572935818451232333304464978744657858891481080527696102221059219531088040771015483498069429415515483475145435022002334095313689903196644279749803202376776055380146512678025693530999672134251522706231741240339178797884160146707079670228499975679474815447564925123352168211204060637785946261220188195304162883293555607678662472083160473319799319340790799956938161581046461701903326435038055094377627107367956746318197255470909119312638103615315005729419072168705554272797n;
 let n = 4718154885788344965686057227014955336900194483486472570312608417855080343993472460222386292086926688070034668790113424625328831853040100832075046459229894337076681246557516321466748509948411310246179509561119487223442270039163111466604622726213230646367253760886076232453593037459933074546658898054878074165166807018937722256192673447119271524326847487934389581949262178014651256289411065621885270732636749272744529491692784884144494924706768749409234056874153375718345287632552158411278202085434556502064734277339444116813708642444816673555031862308456717966952540869168943980192169173500296760464701146050968338245635158432247792829005124088005289255737697519892616630595239358302721923986316398095217166431317978127780764601095866631970548933627746367208613759209338220141400077327695150443928744901653378165653843293465943774278856322560167207571315601958612531862278797868577866797919151802666088920704654605397165155821n;
 let e = 65537n

export let RsaPublicKey = new rsa.RsaPublicKey(e,n);
export let RsaPrivateKey = new rsa.RsaPrivateKey(d,n);

export interface Datos {
    e: string;
    n: string;
}

export interface signResponse{
    response: string;
    signedData: string;
}


export interface User{
  nombre: string;
  correo: string;
  password: string;
}

export interface UserRecibido{
  nombre: string;
  correo: string;
  password: string;
  _id: string;
  saldo_euros: number;
  coins: string[];
  productos: Producto[];
}


export class Cegar {
    r: bigint
    pubKey: rsa.RsaPublicKey
  
    constructor (pubKey: rsa.RsaPublicKey) {
      this.pubKey = pubKey
      this.r = bcu.randBetween(this.pubKey.n)
    }
  
    cegarMensaje (msg: bigint): bigint {
      const bm: bigint = (msg * (this.pubKey.encrypt(this.r))) % this.pubKey.n
      return bm
    }
  
    descegarMensaje (blindedSignature: bigint): bigint {
      return (blindedSignature * bcu.modInv(this.r, this.pubKey.n) % this.pubKey.n)
    }
  }