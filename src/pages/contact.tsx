import { Mail, Phone, User, BookOpen } from 'lucide-react';

const ContactPage = () => {
  // Group members and project guide details
  const groupMembers = [
    {
      name: 'Alfin Albert',
      role: 'Model Developer',
      email: 'alfinalbert2025@it.ajce.in',
      phone: '+123 456 7890',
    },
    {
      name: 'Jeswin Joshy',
      role: 'Data Analyst',
      email: 'jeswinjoshy2025@it.ajce.in',
      phone: '+123 456 7891',
    },
    {
      name: 'Jojo Jacob',
      role: 'Backend Developer',
      email: 'jojojacob2025@it.ajce.in',
      phone: '+123 456 7892',
    },
    {
        name:'Jojo Sony',
        role:'Frontend Developer',
        email:'jojosony2025@it.ajce.in',
        phone:'+91 9074412289',
    },
  ];

  const projectGuide = {
    name: 'Asst Pr.Saumya Sadanandan',
    role: 'Project Guide',
    email: 'saumyasadanandn@it.ajce.in',
    phone: '+123 456 7893',
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-800">Contact Us</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Get in touch with our team members and project guide for any queries or collaboration opportunities.
          </p>
        </div>

        {/* Group Members Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {groupMembers.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">{member.name}</h3>
                <p className="text-sm text-neutral-600 mb-4">{member.role}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-neutral-600">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center text-neutral-600">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    <a href={`tel:${member.phone}`} className="hover:text-blue-600">
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Guide Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-800 mb-2">{projectGuide.name}</h3>
            <p className="text-sm text-neutral-600 mb-6">{projectGuide.role}</p>
            <div className="space-y-3">
              <div className="flex items-center justify-center text-neutral-600">
                <Mail className="h-5 w-5 mr-2 text-green-600" />
                <a href={`mailto:${projectGuide.email}`} className="hover:text-green-600">
                  {projectGuide.email}
                </a>
              </div>
              <div className="flex items-center justify-center text-neutral-600">
                <Phone className="h-5 w-5 mr-2 text-green-600" />
                <a href={`tel:${projectGuide.phone}`} className="hover:text-green-600">
                  {projectGuide.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;