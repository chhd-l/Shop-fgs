import BreadCrumbs from '@/components/BreadCrumbs';
import Collapse from '@/components/Collapse';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RulocalFaq_contents } from '../modules/RulocalFaq';
import './index.less';

const Faq = () => {
  const { Panel } = Collapse;
  const { pathname } = useLocation();

  return (
    <div className="RulocalFaq">
      <Header showMiniIcons={true} showUserIcon={true} />
      <main className="rc-content--fixed-header rc-bg-colour--brand3 px-8">
        <div className="p-12">
          <BreadCrumbs />
        </div>
        <div>
          <div className="max-w-screen-md m-auto p-1">
            <h1 className="text-center mb-0 text-red-500" onClick={() => {
              console.log('pathname',pathname)
            }}>
              Часто задаваемые вопросы
            </h1>
            <p className="text-center my-6">
              Все, что мы делаем, обусловлено стремлением заботиться о здоровье
              и благополучии каждой кошки и собаки.
            </p>
          </div>
          {RulocalFaq_contents.map((item, idx) => (
            <div className=' pb-16' key={idx}>
              <div className="h-2 bg-cs-gray-f6" />
              <div className="md:p-8">
                <div className="p-2">
                  <div className="pt-8">
                    <h2 className="text-center text-red-500 mb-10">
                      {item.title}
                    </h2>
                    <Collapse>
                      {item.list.map((val, key) => (
                        <Panel header={val.title} key={key}>
                          <p>
                            {val.p}
                            <span style={{
                              backgroundColor: 'yellow'
                            }}>{val?.yellowSpan}</span>
                            {val?.span_2}
                            {val?.link && val?.a && <Link>{val?.a}</Link>}
                            {val?.url && val?.a && (
                              <a href={val.url}>{val.a}</a>
                            )}
                            {val?.span && val.span}
                          </p>
                          {val?.ul && (
                            <ul>
                              {val.ul.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ul>
                          )}
                          {val?.ol && (
                            <ol>
                              {val.ol.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ol>
                          )}
                          {val?.p2 && (
                            <p>
                              {val.p2}
                              {val?.url2 && val?.a2 && (
                                <a href={val.url2}>{val.a2}</a>
                              )}
                              {val?.span2 && val.span2}
                            </p>
                          )}
                          {val?.ul2 && (
                            <ul>
                              {val.ul2.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ul>
                          )}
                          {val?.ol2 && (
                            <ol>
                              {val.ol2.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ol>
                          )}
                          {val?.p3 && (
                            <p>
                              {val.p3}
                              {val?.url3 && val?.a3 && (
                                <a href={val.url3}>{val.a3}</a>
                              )}
                              {val?.span3 && val.span3}
                            </p>
                          )}
                          {val?.ul3 && (
                            <ul>
                              {val.ul3.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ul>
                          )}
                          {val?.ol3 && (
                            <ol>
                              {val.ol3.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ol>
                          )}
                          {val?.p4 && (
                            <p>
                              {val.p4}
                              {val?.url4 && val?.a4 && (
                                <a href={val.url4}>{val.a4}</a>
                              )}
                              {val?.span4 && val.span4}
                            </p>
                          )}
                          {val?.ul4 && (
                            <ul>
                              {val.ul4.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ul>
                          )}
                          {val?.ol4 && (
                            <ol>
                              {val.ol4.map((uls, index) => (
                                <li key={index}>{uls}</li>
                              ))}
                            </ol>
                          )}
                        </Panel>
                      ))}
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Faq;
