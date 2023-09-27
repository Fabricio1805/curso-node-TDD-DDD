import fs from 'fs';
import xml2js from 'xml2js';

const nfeData = {
  nfeProc: {
    $: {
      versao: "4.00",
      xmlns: "http://www.portalfiscal.inf.br/nfe",
    },
    NFe: [
      {
        $: {
          xmlns: "http://www.portalfiscal.inf.br/nfe",
        },
        infNFe: [
          {
            $: {
              Id: "NFe29220107358761027520550010000415461898464491",
              versao: "4.00",
            },
            ide: [
              {
                cUF: ["29"],
                cNF: ["89846449"],
                natOp: ["Venda merc.receb.de terceiros"],
                mod: ["55"],
                serie: ["1"],
                nNF: ["41546"],
                dhEmi: ["2022-01-19T15:47:10-03:00"],
                dhSaiEnt: ["2022-01-19T15:57:10-03:00"],
                tpNF: ["1"],
                idDest: ["1"],
                cMunFG: ["2903201"],
                tpImp: ["1"],
                tpEmis: ["1"],
                cDV: ["1"],
                tpAmb: ["1"],
                finNFe: ["1"],
                indFinal: ["0"],
                indPres: ["9"],
                indIntermed: ["0"],
                procEmi: ["0"],
                verProc: ["SAP NFE 10.0"],
              },
            ],
            emit: [
              {
                CNPJ: ["00000000000000"],
                xNome: ["GERDAU ACOS LONGOS SA"],
                enderEmit: [
                  {
                    xLgr: ["AV.CLERISTON ANDRADE"],
                    nro: ["2789"],
                    xBairro: ["RIO GRANDE"],
                    cMun: ["2903201"],
                    xMun: ["BARREIRAS"],
                    UF: ["BA"],
                    CEP: ["47800539"],
                    xPais: ["Brasil"],
                    fone: ["7736143400"],
                  },
                ],
                IE: ["107694670"],
                IM: ["13681"],
                CNAE: ["4679604"],
                CRT: ["3"],
              },
            ],
            dest: [
              {
                CNPJ: ["00000000000000"],
                xNome: ["DEICHSEL CONSTRUTORA LTDA"],
                enderDest: [
                  {
                    xLgr: ["RUA B"],
                    nro: ["S N"],
                    xBairro: ["CENTRO INDUSTRIAL DO CERRADO"],
                    cMun: ["2919553"],
                    xMun: ["LUIS EDUARDO MAGALHAES"],
                    UF: ["BA"],
                    CEP: ["47850000"],
                    cPais: ["1058"],
                    xPais: ["Brasil"],
                    fone: ["7799897635"],
                  },
                ],
                indIEDest: ["1"],
                IE: ["151822263"],
                email: ["cintia@construtoraatlantica.com.br"],
              },
            ],
            autXML: [
              {
                CPF: ["99450976015"],
              },
            ],
            det: [
              {
                $: {
                  nItem: "1",
                },
                prod: [
                  {
                    cProd: ["000000000110006839"],
                    cEAN: ["07891738006432"],
                    xProd: ["VERG CA50 6,3mm RT 12m 1t NV"],
                    NCM: ["72142000"],
                    CEST: ["1004200"],
                    indEscala: ["S"],
                    CFOP: ["5102"],
                    uCom: ["KG"],
                    qCom: ["1078.0000"],
                    vUnCom: ["7.3839517625"],
                    vProd: ["7959.90"],
                    cEANTrib: ["07891738006432"],
                    uTrib: ["KG"],
                    qTrib: ["1078.0000"],
                    vUnTrib: ["7.3839517625"],
                    indTot: ["1"],
                    xPed: ["PEDIDO"],
                    nFCI: ["EBEA8A0C-AA8C-4CAE-8A35-1321961E1BF4"],
                  },
                ],
                imposto: [
                  {
                    ICMS: [
                      {
                        ICMS20: [
                          {
                            orig: ["5"],
                            CST: ["20"],
                            modBC: ["3"],
                            pRedBC: ["41.1700"],
                            vBC: ["4682.81"],
                            pICMS: ["18.0000"],
                            vICMS: ["842.91"],
                          },
                        ],
                      },
                    ],
                    IPI: [
                      {
                        cEnq: ["999"],
                        IPINT: [
                          {
                            CST: ["51"],
                          },
                        ],
                      },
                    ],
                    PIS: [
                      {
                        PISAliq: [
                          {
                            CST: ["01"],
                            vBC: ["7116.99"],
                            pPIS: ["1.6500"],
                            vPIS: ["117.43"],
                          },
                        ],
                      },
                    ],
                    COFINS: [
                      {
                        COFINSAliq: [
                          {
                            CST: ["01"],
                            vBC: ["7116.99"],
                            pCOFINS: ["7.6000"],
                            vCOFINS: ["540.89"],
                          },
                        ],
                      },
                    ],
                  },
                ],
                infAdProd: [
                  "REDUCAO BASE CALCULO ICMS NAS SAIDAS INTERNAS CFE DECRETO 7.799/2000 ART 1o PARECER 32251/2019; 32256/2019; 32260/2019; 32263/2019 E 32268/2019",
                ],
              },
            ],
            total: [
              {
                ICMSTot: [
                  {
                    vBC: ["4682.81"],
                    vICMS: ["842.91"],
                    vICMSDeson: ["0.00"],
                    vFCP: ["0.00"],
                    vBCST: ["0.00"],
                    vST: ["0.00"],
                    vFCPST: ["0.00"],
                    vFCPSTRet: ["0.00"],
                    vProd: ["7959.90"],
                    vFrete: ["0.00"],
                    vSeg: ["0.00"],
                    vDesc: ["0.00"],
                    vII: ["0.00"],
                    vIPI: ["0.00"],
                    vIPIDevol: ["0.00"],
                    vPIS: ["117.43"],
                    vCOFINS: ["540.89"],
                    vOutro: ["0.00"],
                    vNF: ["7959.90"],
                  },
                ],
              },
            ],
            transp: [
              {
                modFrete: ["0"],
                transporta: [
                  {
                    CNPJ: ["26176547000136"],
                    xNome: ["KLEYBER CRISTHIAN ABREU GONCALVES N ENTO ME"],
                    IE: ["135352902"],
                    xEnder: ["AVENIDA CLERISTON ANDRADE 2789 2789"],
                    xMun: ["BARREIRAS"],
                    UF: ["BA"],
                  },
                ],
                vol: [
                  {
                    qVol: ["1"],
                    esp: ["VOL"],
                    pesoL: ["1078.000"],
                    pesoB: ["1078.000"],
                  },
                ],
              },
            ],
            cobr: [
              {
                fat: [
                  {
                    nFat: ["9008863524"],
                    vOrig: ["7959.90"],
                    vDesc: ["0.00"],
                    vLiq: ["7959.90"],
                  },
                ],
                dup: [
                  {
                    nDup: ["001"],
                    dVenc: ["2022-02-18"],
                    vDup: ["2653.30"],
                  },
                  {
                    nDup: ["002"],
                    dVenc: ["2022-03-20"],
                    vDup: ["2653.30"],
                  },
                  {
                    nDup: ["003"],
                    dVenc: ["2022-04-19"],
                    vDup: ["2653.30"],
                  },
                ],
              },
            ],
            pag: [
              {
                detPag: [
                  {
                    indPag: ["1"],
                    tPag: ["15"],
                    vPag: ["7959.90"],
                  },
                ],
              },
            ],
            infAdic: [
              {
                infCpl: [
                  "REDUCAO BASE CALCULO ICMS NAS SAIDAS INTERNAS CFE DECRETO 7.7992000 ART1o PARECER 322512019 322562019 322602019 322632019 E 322682019 Nao recebendo o boleto de cobranca bancaria ate o vencimento,o mesmo pode ser solicitado no seguinte endereco cargerdau.com.br Em caso de atraso serao cobrados juros de 1 a.m. acrescidos de multa e reembolso de despesas de Cobranca. A DESCARGA DO MATERIAL E DE RESPONSABILIDADE DO CLIENTE SEGUE 01 BOLETO BANCARIO DOC34092443 REF9008863524 ORD11460422 DOC.Transp15819845 REF.ClientePEDIDO Ciente que a venda foi realizada no sistema Trademaster, conforme boletos anexos. Contrato de Cartao de Compras em tm.digital. Duvida Procure seu representante Gerdau RESOLUCAO DO SENADO FEDERAL No 1312 SEMVP",
                ],
              },
            ],
          },
        ],
        Signature: [
          {
            $: {
              xmlns: "http://www.w3.org/2000/09/xmldsig#",
            },
            SignedInfo: [
              {
                CanonicalizationMethod: [
                  {
                    $: {
                      Algorithm:
                        "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
                    },
                  },
                ],
                SignatureMethod: [
                  {
                    $: {
                      Algorithm: "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
                    },
                  },
                ],
                Reference: [
                  {
                    $: {
                      URI: "#NFe29220107358761027520550010000415461898464491",
                    },
                    Transforms: [
                      {
                        Transform: [
                          {
                            $: {
                              Algorithm:
                                "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
                            },
                          },
                          {
                            $: {
                              Algorithm:
                                "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
                            },
                          },
                        ],
                      },
                    ],
                    DigestMethod: [
                      {
                        $: {
                          Algorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
                        },
                      },
                    ],
                    DigestValue: ["E+Rm8ng2aVopHmxWooi4wPXvCio="],
                  },
                ],
              },
            ],
            SignatureValue: [
              "Srm1rh5UQ+b+yllOCastzBJ7SVwJhFF+TqNZEFnCdLrHtfmlZzC4qT+2UVIULdYaSvLh5cWZW+CN\nrmVnlkxSKzh1XQIgRqHsv8VdBWEQFyWQSl74l073BNBwu87pphJDxxgNnzqr1AbZcHasdqgRDjpc\necJfhnOaTIpCyX08754XQ65E0yedaOZTt8V0ChBEORJzhsTVhUwsRe7o3f2z48JpdJ2YmckaML9j\nnRYR1sfxSkzzLg8Yy/8EAYpuuIrK+RliCTsRaGcue2oKMrWljtpKUMZmIXViZs6ZbvHdbmX77M2U\n1OYvs3Ac92t4oFY3PgJ1Nmesy8UV/1fkM4ATvA==",
            ],
            KeyInfo: [
              {
                X509Data: [
                  {
                    X509Certificate: [
                      "MIIHszCCBZugAwIBAgIIGRkydSnDcT0wDQYJKoZIhvcNAQELBQAwTDELMAkGA1UEBhMCQlIxEzAR\nBgNVBAoMCklDUC1CcmFzaWwxKDAmBgNVBAMMH1NFUkFTQSBDZXJ0aWZpY2Fkb3JhIERpZ2l0YWwg\ndjUwHhcNMjEwNzIxMDI0MzAwWhcNMjIwNzIxMDI0MzAwWjCB+zELMAkGA1UEBhMCQlIxEzARBgNV\nBAoMCklDUC1CcmFzaWwxFDASBgNVBAsMCyhFTSBCUkFOQ08pMRgwFgYDVQQLDA8wMDAwMDEwMTAz\nNzUyNDIxFDASBgNVBAsMCyhFTSBCUkFOQ08pMRQwEgYDVQQLDAsoRU0gQlJBTkNPKTElMCMGA1UE\nCwwcU0VSQVNBIENlcnRpZmljYWRvcmEgRGlnaXRhbDEXMBUGA1UECwwONjIxNzM2MjAwMDAxODAx\nGTAXBgNVBAsMEFZJREVPQ09ORkVSRU5DSUExIDAeBgNVBAMMF0dFUkRBVSBBQ09TIExPTkdPUyBT\nLkEuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyzjj3TgT4gisl/T2NpZis/2Kvf80\n4rC12Gb/MyMRVdrHVuYibwO478WV1+u/+WlXDmCEGWhBrVZtAG6WFBrtZtnZnoZTtiAxGCdx+yVo\nqRUKTlmaq4laDDKgxLwTdf2Qwg5GmnMqh11rNi8BT4onqwXAA0yM8WENuiJVf+7RHIa025YtngO0\nG1KmkSLpX0bBj7KQlXdEpEZ+Ro2EUaFu1NJyeV9yYBybIX2I29yxOIrxSe2zcNrNefBUP14CSvUV\nRI1cXPJ+28BdWfbx4m7jGlD5p803przSJrnDcPFBrRYteZp2JCF/7GElZvvxvfRAjLqh/resg0NC\neCJiC3xgJQIDAQABo4IC5zCCAuMwHwYDVR0jBBgwFoAUVnWvSnOy2AjEfftsKBwR1ffBqMwwgZcG\nCCsGAQUFBwEBBIGKMIGHMEcGCCsGAQUFBzAChjtodHRwOi8vd3d3LmNlcnRpZmljYWRvZGlnaXRh\nbC5jb20uYnIvY2FkZWlhcy9zZXJhc2FjZHY1LnA3YjA8BggrBgEFBQcwAYYwaHR0cDovL29jc3Au\nY2VydGlmaWNhZG9kaWdpdGFsLmNvbS5ici9zZXJhc2FjZHY1MIHGBgNVHREEgb4wgbuBH21pY2hl\nbGUuZ29uY2FsdmVzQGdlcmRhdS5jb20uYnKgPgYFYEwBAwSgNRMzMDkwNjE5NjM0NDc0MjE1MDAx\nNTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwoCQGBWBMAQMCoBsTGUhBUkxFWSBMT1JF\nTlRaIFNDQVJET0VMTEmgGQYFYEwBAwOgEBMOMDczNTg3NjEwMDAxNjmgFwYFYEwBAwegDhMMMDAw\nMDAwMDAwMDAwMHEGA1UdIARqMGgwZgYGYEwBAgEGMFwwWgYIKwYBBQUHAgEWTmh0dHA6Ly9wdWJs\naWNhY2FvLmNlcnRpZmljYWRvZGlnaXRhbC5jb20uYnIvcmVwb3NpdG9yaW8vZHBjL2RlY2xhcmFj\nYW8tc2NkLnBkZjAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwgZsGA1UdHwSBkzCBkDBJ\noEegRYZDaHR0cDovL3d3dy5jZXJ0aWZpY2Fkb2RpZ2l0YWwuY29tLmJyL3JlcG9zaXRvcmlvL2xj\nci9zZXJhc2FjZHY1LmNybDBDoEGgP4Y9aHR0cDovL2xjci5jZXJ0aWZpY2Fkb3MuY29tLmJyL3Jl\ncG9zaXRvcmlvL2xjci9zZXJhc2FjZHY1LmNybDAdBgNVHQ4EFgQUtDweKLWp8iV8bkUh5fFPbzIh\nUb4wDgYDVR0PAQH/BAQDAgXgMA0GCSqGSIb3DQEBCwUAA4ICAQBG/dvoHhFU1zuR8vYG5YO4pgaH\niEqzMAs6Me4oK4iyfjxtyNgr/PzS+CwwY7UEC1XStFcrOn04aCDXWdtnpYV8w+nA2Kclu+3qco6S\nYphS5+OiB83FVYuci+V6vcJBzSRDA+8RLZK+v8gKRxXyFSkN8T+t3eWRalVMIeunrsLZaU4v6NGd\n4mNefvPPc3wYxF0iRyqdWyt2uwijjV7CtHxuAbDSiv2/MFVmVV6sN4aqAnAA6BKlSc96rQulJvB3\ncJYWbTPX+/c97QcDwdu2yUqepbqPiYRrLKB4AvyupHwmOumyXXc6U9E+uFTEh+ZBRFOmFZ1rJo01\nznfyqRQLGK61vHPNV/2smozhaiZ4FcvqE2IF76D+XMMJAikGHyHFT8+/TOejjO9imcE3xHeSIHS0\ncwcma1xoW8ilCYCJJxwHLuMlmkDPjWf08BUxftKMzN+5TUahENUDOFaPYaDIJqcL0D1YgJoD8jox\nU/XKWtI49QQ4BQo38fLAmhsd5+aKhOu1qhTWuUChuTGxU6+INR1ZxJrHK8wcWre2O5MsygCPq1y8\nNXSJ3FLPv3b8cIiqCIZA/2X02xdpQhAvwItDcCyh8r8pBNJ9JWALUyKY/mFJ1KTEDZ4b2XgN3GJ9\nK54n9JekbxltCGlcD83ldplaL9Cn3y3tV6SDpbsvPr678oI1qw==",
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    protNFe: [
      {
        $: {
          versao: "4.00",
        },
        infProt: [
          {
            $: {
              xmlns: "http://www.portalfiscal.inf.br/nfe",
              Id: "NFe129220327445210",
            },
            tpAmb: ["1"],
            verAplic: ["6.0"],
            chNFe: ["29220107358761027520550010000415461898464491"],
            dhRecbto: ["2022-01-19T15:48:33-03:00"],
            nProt: ["129220327445210"],
            digVal: ["E+Rm8ng2aVopHmxWooi4wPXvCio="],
            cStat: ["100"],
            xMotivo: ["Autorizado o uso da NF-e"],
          },
        ],
      },
    ],
  },
};

// Converter os dados em um objeto JavaScript para XML
const builder = new xml2js.Builder();
const xmlNFe = builder.buildObject(nfeData);

// Salvar o XML em um arquivo
fs.writeFileSync("nfe.xml", xmlNFe);

console.log("XML da NFe gerado com sucesso!");