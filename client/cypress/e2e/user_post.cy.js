import { mockClientLogin } from "../../src/Tests/mockVars";

describe("post", () => {
  function cypressLogin() {
    // user lands at home and navigates to login page
    // NAVIGATE TO localhost:3000/login
    cy.visit("/login");

    // log in using the brain 3 account
    // WRITE INTO EMAIL AND PASSWORD AND CLICK LOGIN
    cy.findByRole("textbox", { name: /email/i }).type(mockClientLogin.email);
    cy.findByLabelText(/password/i).type(mockClientLogin.password);

    cy.findByRole("button", { name: /login/i }).click();
    cy.wait(5000);
  }

  function cypressLogout() {
    // log out
    cy.findByTitle("dropdown-button").click();
    cy.findByRole("button", { name: /logout/i }).click();
  }

  it("user can log in, like a post and reply to the post", () => {
    cypressLogin();
    // check first post on feed
    let post = cy.findAllByTestId("post").first();
    let likebutton = post.findByTestId("like-button");
    likebutton.click();

    post = cy.findAllByTestId("post").first();
    let commentbutton = post.findByTestId("chat-button");
    commentbutton.click();

    post = cy.findAllByTestId("post").first();
    post.findByRole("textbox").type("good post");

    post = cy.findAllByTestId("post").first();
    post.findByRole("button", { name: /submit/i }).click();

    // CLEANUP
    // delete reply
    post = cy.findAllByTestId("post").first();
    let reply = post.findByTestId("reply");
    reply.trigger("mouseenter");
    reply.findByRole("button", { name: /trash/i }).click();

    // logout
    cypressLogout();
  });

  it("user logs in, creates a post wihtout an image and likes own post", () => {
    let postText = "wonderful day it is!";

    cypressLogin();
    // find post textbox and type something
    cy.findByRole("textbox").type(postText);

    // find submit button and submit post
    cy.findByRole("button", { name: /post/i }).click();

    // wait for post to be submitted. Then, query for post
    cy.findByText(postText);
    let post = cy.findAllByTestId("post").first();
    post.findByTestId("like-button").click();

    // CLEANUP
    // delete post
    post = cy.findAllByTestId("post").first();
    let postHeader = post.findByTestId("person-detail-flex");
    postHeader.trigger("mouseenter");
    postHeader.findByRole("button", { name: /trash/i }).click();

    // logout
    cypressLogout();
  });
});
