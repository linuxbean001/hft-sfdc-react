import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

	class Footer extends Component {
	render() {
	return (
	<div>

      <div className="page-block" id="page-block-cu6t2wteevwvcxr">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 footer-1">
              <section id="text-9" className="widget widget_text">
                <h3 className="widget-title">Trauma Therapy Training
				</h3>
                <div className="textwidget">
                  <p>
                    <a href="/helpfortrauma/" style={{ cursor: "pointer"}}>Traumatology</a>
                    <a href="abouttrauma.html" style={{ cursor: "pointer"}}>About Trauma</a>
                    <a href="dissociativedisorder.html" style={{ cursor: "pointer"}}>Dissociativedisorder</a>
                    <a href="traumatraining.html" style={{ cursor: "pointer"}}>Traumatraining</a>
                    <NavLink to={'/certification'}>Certification</NavLink>
                    <NavLink to={'/ce-credits'}>Continuing Education Credits</NavLink>

                  </p>
                </div>
              </section>
            </div>
            <div className="col-12 col-md-3 footer-2">
              <section id="recent-posts-2" className="widget widget_recent_entries">
                <h3 className="widget-title">Trauma Topics
				</h3>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a href="https://www.helpfortrauma.com/video/for-more-info-on-itr-method/itr-explained/" className="nav-link">ITR™ Explained
					</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.helpfortrauma.com/blog/the-silent-scream/" className="nav-link">The Silent Scream
					</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.helpfortrauma.com/article/a-life-of-quiet-desperation/" className="nav-link">Infant Surgery Without Anesthesia
					</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.helpfortrauma.com/video/preverbal-trauma/for-survivors-of-preverbal-trauma/" className="nav-link">For Survivors of Preverbal Trauma
					</a>
                  </li>
                  <li className="nav-item">
                    <a href="https://www.helpfortrauma.com/video/traumatic-stress-symptoms/on-big-t-little-t-trauma/" className="nav-link">On Big T Little T Trauma
					</a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-12 col-md-3 footer-3">
              <section id="text-3" className="widget widget_text">
                <h3 className="widget-title">Contact Us
				</h3>
                <div className="textwidget">
                  <p>
                    <a href="mailto:info@helpfortrauma.com">info@helpfortrauma.com
					</a>
                  </p>
                  <p>
                    <a href="https://www.helpfortrauma.com/contact-us/">Contact Form
					</a>
                  </p>
                  <p>Phone: 833-ITRtherapy
				  </p>
                  <p>Help for Trauma, LLC
					<br/>
                      Morgantown, WV
				  </p>
				</div>
			  </section>
			</div>
              <div className="col-12 col-md-3 footer-4">
                <section id="text-6" className="widget widget_text">
                  <div className="textwidget">
                    <p>
                      <a href="tel:833-487-8437" className="title-phone">(833) 487-8437
					</a>
                    </p>
                    <p>
                      <strong>If this is an emergency PLEASE DIAL 911
					</strong>
                    </p>
                    <p>
                      <a href="https://www.helpfortrauma.com/terms/">Terms of Service
					</a> |
					<a href="https://www.helpfortrauma.com/privacy-policy/">Privacy Policy
					</a>
                    </p>
                  </div>
                </section>
                <section id="custom_html-2" className="widget_text widget widget_custom_html">
                  <div className="textwidget custom-html-widget">
                    <ul className="social-media">
                      <li>
                        <a href="https://www.youtube.com/helpfortrauma" className="social-icon">
                          <i className="fab fa-youtube-square">
                         
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/HelpForTrauma/" className="social-icon">
                          <i className="fab fa-facebook-square">
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/helpfortrauma" className="social-icon">
                          <i className="fab fa-twitter-square">
                          </i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

	</div>
	);
	}
	}

	export default Footer;