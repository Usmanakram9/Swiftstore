import React from 'react';
import '../assets/CSS/NewsLetter.css'
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

const NewsLetter = () => {
  return (
    <>
      	<div id="newsletter" className="section">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="newsletter">
							<p>Sign Up for the <strong>NEWSLETTER</strong></p>
							<form>
								<input id='newsletter-input' className="input" type="email" placeholder="Enter Your Email" />
								<button className="newsletter-btn"><i className="fa fa-envelope"></i> Subscribe</button>
							</form>
							<ul className="newsletter-follow">
								<li>
									<a href="/"><i><FaFacebook/></i></a>
								</li>
								<li>
									<a href="/"><i><FaTwitter/></i></a>
								</li>
								<li>
									<a href="/"><i><FaInstagram/></i></a>
								</li>
								<li>
									<a href="/"><i><FaPinterest/></i></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
  )
}

export default NewsLetter