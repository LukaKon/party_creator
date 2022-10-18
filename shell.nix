with import <nixpkgs> { };
let
  name = "Party Wizard";
  pythonEnv = python3.withPackages (ps: [
    #   # ps.django_4
    # ps.djangorestframework
    # ps.django-cors-headers
    # ps.djangorestframework-simplejwt
    # ps.pyjwt
    # ps.django-filter

    ps.bpython
    # ps.black
  ]);

in
mkShell {
  buildInputs = [
    # pythonEnv
    python310

    bmake
    # http-prompt
  ];

  shellHook = ''
    echo "Enter to '${name}' env..."
    source env/bin/activate
    which python
    echo "Env activated"
  '';
}
